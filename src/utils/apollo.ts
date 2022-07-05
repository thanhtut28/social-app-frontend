import { createHttpLink, ApolloLink, ApolloClient, InMemoryCache, from } from "@apollo/client";
import { onError } from "@apollo/client/link/error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken } from "./getAccessToken";

const httpLink = createHttpLink({
   uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
   credentials: "include",
});

const errorLink = onError(({ graphQLErrors, networkError }) => {
   if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
         console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
      );
   }
   if (networkError) {
      console.log(`[Network error]: ${networkError}`);
   }
});

const authMiddleware = new ApolloLink((operation, forward) => {
   const accessToken = getAccessToken();

   operation.setContext(({ headers = {} }) => ({
      headers: {
         ...headers,
         authorization: accessToken ? `Bearer ${accessToken}` : "",
      },
   }));

   return forward(operation).map(response => {
      return response;
   });
});

// this link will renew acessToken
// refresh_token route checks refreshToken cookie that was sent from login mutation or refresh_token link.
// so if the cookies wasn't set before, return {ok: false, token: ""}, otherwise return {ok: true, token: "token"}

const refreshTokenLink = new TokenRefreshLink({
   accessTokenField: "accessToken",
   isTokenValidOrUndefined: () => {
      const token = getAccessToken();

      if (!token) {
         return true;
      }

      try {
         const { exp }: any = jwtDecode(token);
         if (Date.now() >= exp * 1000) {
            return false;
         } else {
            return true;
         }
      } catch (err) {
         return false;
      }
   },
   fetchAccessToken: () => {
      return fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/refresh_token`, {
         method: "POST",
         credentials: "include",
      });
   },
   handleFetch: accessToken => {
      // const accessTokenDecrypted = jwtDecode(accessToken);
      // setAccessToken(accessToken);
      // setExpiresIn(parseExp(accessTokenDecrypted.exp).toString());
      return accessToken;
   },
   handleError: err => {
      // full control over handling token fetch Error
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);

      // When the browser is offline and an error occurs we don’t want the user to be logged out of course.
   },
});

export const client = new ApolloClient({
   cache: new InMemoryCache({}),
   link: from([refreshTokenLink, authMiddleware, errorLink, httpLink]),
});
