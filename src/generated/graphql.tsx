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

export type AllPostsQueryVariables = Exact<{
  input: GetAllPostsInput;
}>;


export type AllPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: string, title: string, image?: string | null, likeCount: number, likeStatus: boolean, createdAt: any, author: { __typename?: 'User', name: string }, comments: Array<{ __typename?: 'Comment', id: string, comment: string, createdAt: any, author: { __typename?: 'User', name: string } }> }> };


export const AllPostsDocument = gql`
    query AllPosts($input: GetAllPostsInput!) {
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
 * __useAllPostsQuery__
 *
 * To run a query within a React component, call `useAllPostsQuery` and pass it any options that fit your needs.
 * When your component renders, `useAllPostsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useAllPostsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useAllPostsQuery(baseOptions: Apollo.QueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
      }
export function useAllPostsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<AllPostsQuery, AllPostsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<AllPostsQuery, AllPostsQueryVariables>(AllPostsDocument, options);
        }
export type AllPostsQueryHookResult = ReturnType<typeof useAllPostsQuery>;
export type AllPostsLazyQueryHookResult = ReturnType<typeof useAllPostsLazyQuery>;
export type AllPostsQueryResult = Apollo.QueryResult<AllPostsQuery, AllPostsQueryVariables>;