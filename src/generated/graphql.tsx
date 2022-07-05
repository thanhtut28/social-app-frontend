import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
const defaultOptions = {} as const;
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  Date: any;
};

export type ChangeInputPassword = {
  email: Scalars['String'];
  newPassword: Scalars['String'];
  password: Scalars['String'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['Int'];
  comment: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  post: Post;
  postId: Scalars['Int'];
};

export type GetAllPostsInput = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type Like = {
  __typename?: 'Like';
  author: User;
  authorId: Scalars['Int'];
  id: Scalars['ID'];
  post: Post;
  postId: Scalars['Int'];
  status: Scalars['Boolean'];
};

export type LoginInput = {
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginResponse = {
  __typename?: 'LoginResponse';
  accessToken: Scalars['String'];
  user: User;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String'];
  createComment: Comment;
  createPost: Post;
  deletePost: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  signIn?: Maybe<LoginResponse>;
  signUp?: Maybe<User>;
  updateComment: Comment;
  updatePost?: Maybe<Post>;
};


export type MutationChangePasswordArgs = {
  input: ChangeInputPassword;
};


export type MutationCreateCommentArgs = {
  comment: Scalars['String'];
  postId: Scalars['Int'];
};


export type MutationCreatePostArgs = {
  image?: InputMaybe<Scalars['String']>;
  title: Scalars['String'];
};


export type MutationDeletePostArgs = {
  postId: Scalars['Int'];
};


export type MutationFollowUserArgs = {
  followingId: Scalars['Int'];
};


export type MutationLikePostArgs = {
  postId: Scalars['Int'];
};


export type MutationSignInArgs = {
  input: LoginInput;
};


export type MutationSignUpArgs = {
  input: SignUpInput;
};


export type MutationUpdateCommentArgs = {
  commentId: Scalars['Int'];
  newComment: Scalars['String'];
};


export type MutationUpdatePostArgs = {
  image?: InputMaybe<Scalars['String']>;
  postId: Scalars['Int'];
  title?: InputMaybe<Scalars['String']>;
};

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int'];
  comments: Array<Comment>;
  createdAt: Scalars['Date'];
  id: Scalars['ID'];
  image?: Maybe<Scalars['String']>;
  likeCount: Scalars['Int'];
  likeStatus: Scalars['Boolean'];
  title: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  allPosts: Array<Post>;
  allUsers: Array<User>;
  me?: Maybe<User>;
};


export type QueryAllPostsArgs = {
  input: GetAllPostsInput;
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type User = {
  __typename?: 'User';
  email: Scalars['String'];
  followers: Array<Follows>;
  followersCount: Scalars['Int'];
  following: Array<Follows>;
  followingCount: Scalars['Int'];
  id: Scalars['ID'];
  name: Scalars['String'];
  posts: Array<Post>;
  postsCount: Scalars['Int'];
};

export type Follows = {
  __typename?: 'follows';
  follower: User;
  followerId: Scalars['Int'];
  following: User;
  followingId: Scalars['Int'];
};

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn?: { __typename?: 'LoginResponse', accessToken: string } | null };

export type GetAllPostsQueryVariables = Exact<{
  input: GetAllPostsInput;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: string, title: string, image?: string | null, likeCount: number, likeStatus: boolean, createdAt: any, author: { __typename?: 'User', name: string }, comments: Array<{ __typename?: 'Comment', id: string, comment: string, createdAt: any, author: { __typename?: 'User', name: string } }> }> };


export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  signIn(input: $input) {
    accessToken
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, options);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const GetAllPostsDocument = gql`
    query GetAllPosts($input: GetAllPostsInput!) {
  allPosts(input: $input) {
    id
    title
    image
    likeCount
    likeStatus
    author {
      name
    }
    createdAt
    comments {
      id
      comment
      createdAt
      author {
        name
      }
    }
  }
}
    `;

/**
 * __useGetAllPostsQuery__
 *
 * To run a query within a React component, call `useGetAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetAllPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetAllPostsQuery(baseOptions: Apollo.QueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
      }
export function useGetAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetAllPostsQuery, GetAllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetAllPostsQuery, GetAllPostsQueryVariables>(GetAllPostsDocument, options);
        }
export type GetAllPostsQueryHookResult = ReturnType<typeof useGetAllPostsQuery>;
export type GetAllPostsLazyQueryHookResult = ReturnType<typeof useGetAllPostsLazyQuery>;
export type GetAllPostsQueryResult = Apollo.QueryResult<GetAllPostsQuery, GetAllPostsQueryVariables>;