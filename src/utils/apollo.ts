import {
   createHttpLink,
   ApolloLink,
   ApolloClient,
   InMemoryCache,
   from,
   StoreObject,
   split,
} from "@apollo/client";
import { ReadFieldFunction } from "@apollo/client/cache/core/types/common";
import { onError } from "@apollo/client/link/error";
import { TokenRefreshLink } from "apollo-link-token-refresh";
import jwtDecode from "jwt-decode";
import { getAccessToken, setAccessToken } from "./getAccessToken";
import { GraphQLWsLink } from "@apollo/client/link/subscriptions";
import { createClient } from "graphql-ws";
import { getMainDefinition } from "@apollo/client/utilities";

const wsLink =
   typeof window !== "undefined"
      ? new GraphQLWsLink(
           createClient({
              url: "ws://localhost:4000/graphql",
           })
        )
      : null;

const httpLink = createHttpLink({
   uri: `${process.env.NEXT_PUBLIC_SERVER_URL}/graphql`,
   credentials: "include",
});

const splitLink =
   typeof window !== "undefined" && wsLink != null
      ? split(
           ({ query }) => {
              const def = getMainDefinition(query);
              return def.kind === "OperationDefinition" && def.operation === "subscription";
           },
           wsLink,
           httpLink
        )
      : httpLink;

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
   // const accessToken = getAccessToken();

   operation.setContext(({ headers = {} }) => ({
      headers: {
         ...headers,
         // authorization: accessToken ? `Bearer ${accessToken}` : "",
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
      setAccessToken(accessToken);
      // setExpiresIn(parseExp(accessTokenDecrypted.exp).toString());
   },
   handleError: err => {
      // full control over handling token fetch Error
      console.warn("Your refresh token is invalid. Try to relogin");
      console.error(err);

      // When the browser is offline and an error occurs we don’t want the user to be logged out of course.
   },
});

const cache = new InMemoryCache({
   typePolicies: {
      Query: {
         fields: {
            getComments: {
               // without keyArgs apollo will give the same comments for all posts
               keyArgs: ["input", ["postId"]],

               merge(
                  existing,
                  incoming,
                  {
                     args: {
                        input: { cursor },
                     },
                     readField,
                  }: any
               ) {
                  // const merged = existing ? existing.slice(0) : [];
                  // console.log("existing", existing);
                  // console.log("incoming", incoming);
                  // console.log("cursor", cursor);
                  // let offset = offsetFromCursor(merged, cursor, readField);
                  // // If we couldn't find the cursor, default to appending to
                  // // the end of the list, so we don't lose any data.
                  // if (offset < 0) offset = merged.length;
                  // // Now that we have a reliable offset, the rest of this logic
                  // // is the same as in offsetLimitPagination.
                  // for (let i = 0; i < incoming.length; ++i) {
                  //    merged[offset + i] = incoming[i];
                  // }
                  // return merged;
                  console.log("existing", existing);
                  console.log("incoming", incoming);
                  const merged = { ...existing };
                  incoming.forEach((item: any) => {
                     merged[readField("id", item)] = item;
                  });
                  return merged;
               },
               read(existing) {
                  return existing && Object.values(existing);
               },
            },
         },
      },
   },
});

function offsetFromCursor(
   items: StoreObject[],
   cursor: number | null,
   readField: ReadFieldFunction
) {
   // Search from the back of the list because the cursor we're
   // looking for is typically the ID of the last item.
   for (let i = items.length - 1; i >= 0; --i) {
      const item = items[i];

      // Using readField works for both non-normalized objects
      // (returning item.id) and normalized references (returning
      // the id field from the referenced entity object), so it's
      // a good idea to use readField when you're not sure what
      // kind of elements you're dealing with.
      if (readField("id", item) === cursor) {
         // Add one because the cursor identifies the item just
         // before the first item in the page we care about.
         return i + 1;
      }
   }
   // Report that the cursor could not be found.
   return -1;
}

export const client = new ApolloClient({
   cache,
   link: from([authMiddleware, errorLink, splitLink]),
});
