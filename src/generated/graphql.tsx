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

export type CollectionsOnPosts = {
  __typename?: 'CollectionsOnPosts';
  post: Post;
  postId: Scalars['Int'];
  user: User;
  userId: Scalars['Int'];
};

export type Comment = {
  __typename?: 'Comment';
  author: User;
  authorId: Scalars['Int'];
  children?: Maybe<Array<Comment>>;
  comment: Scalars['String'];
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  isAuthor: Scalars['Boolean'];
  parent?: Maybe<Comment>;
  parentId?: Maybe<Scalars['Int']>;
  post: Post;
  postId: Scalars['Int'];
};

export type Error = {
  __typename?: 'Error';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type GetAllPostsInput = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type GetCommentsInput = {
  cursor?: InputMaybe<Scalars['Int']>;
  limit: Scalars['Int'];
  postId: Scalars['Int'];
};

export type IBaseNotificationEvent = {
  /** Event type */
  eventType: NotificationEventType;
};

export type Like = {
  __typename?: 'Like';
  author: User;
  authorId: Scalars['Int'];
  id: Scalars['Int'];
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
  error?: Maybe<Error>;
};

export type Mutation = {
  __typename?: 'Mutation';
  changePassword: Scalars['String'];
  createComment: Comment;
  createPost: Post;
  createReply: Comment;
  deletePost: Scalars['Boolean'];
  followUser: Scalars['Boolean'];
  likePost: Scalars['Boolean'];
  logout: Scalars['Boolean'];
  savedToCollections: Scalars['Boolean'];
  signIn: LoginResponse;
  signUp: SignUpResponse;
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
  image: Scalars['String'];
  title?: InputMaybe<Scalars['String']>;
};


export type MutationCreateReplyArgs = {
  comment: Scalars['String'];
  parentId: Scalars['Int'];
  postId: Scalars['Int'];
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


export type MutationSavedToCollectionsArgs = {
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

/** When a new post is created */
export type NotificationEvent = IBaseNotificationEvent & {
  __typename?: 'NotificationEvent';
  /** Event type */
  eventType: NotificationEventType;
  /** Notification Type */
  notificationType: NotificationType;
  /** User who created notification event */
  user?: Maybe<User>;
};

export enum NotificationEventType {
  NewNotification = 'NewNotification'
}

export enum NotificationType {
  Comment = 'Comment',
  Follow = 'Follow',
  Like = 'Like'
}

export type Post = {
  __typename?: 'Post';
  author: User;
  authorId: Scalars['Int'];
  collectors: Array<User>;
  comments: Array<Comment>;
  commentsCount: Scalars['Int'];
  createdAt: Scalars['Date'];
  id: Scalars['Int'];
  image: Scalars['String'];
  likeCount: Scalars['Int'];
  likeStatus: Scalars['Boolean'];
  title?: Maybe<Scalars['String']>;
};

export type Query = {
  __typename?: 'Query';
  allPosts: Array<Post>;
  allUsers: Array<User>;
  getComments: Array<Comment>;
  profile?: Maybe<User>;
};


export type QueryAllPostsArgs = {
  input: GetAllPostsInput;
};


export type QueryGetCommentsArgs = {
  input: GetCommentsInput;
};


export type QueryProfileArgs = {
  name: Scalars['String'];
};

export type SignUpInput = {
  email: Scalars['String'];
  name: Scalars['String'];
  password: Scalars['String'];
};

export type SignUpResponse = {
  __typename?: 'SignUpResponse';
  accessToken: Scalars['String'];
  error?: Maybe<Error>;
};

export type Subscription = {
  __typename?: 'Subscription';
  notification?: Maybe<NotificationEvent>;
};

export type User = {
  __typename?: 'User';
  collection: Array<Post>;
  email: Scalars['String'];
  followers: Array<Follows>;
  followersCount: Scalars['Int'];
  following: Array<Follows>;
  followingCount: Scalars['Int'];
  id: Scalars['Int'];
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

export type CommentDetailsFragment = { __typename?: 'Comment', id: number, createdAt: any, comment: string, parentId?: number | null, isAuthor: boolean, author: { __typename?: 'User', id: number, name: string } };

export type CommentsCountFragment = { __typename?: 'Post', commentsCount: number };

export type LikeStatusFragment = { __typename?: 'Post', likeStatus: boolean, likeCount: number };

export type CreateCommentMutationVariables = Exact<{
  comment: Scalars['String'];
  postId: Scalars['Int'];
}>;


export type CreateCommentMutation = { __typename?: 'Mutation', createComment: { __typename?: 'Comment', id: number, createdAt: any, comment: string, parentId?: number | null, isAuthor: boolean, author: { __typename?: 'User', id: number, name: string } } };

export type CreateReplyMutationVariables = Exact<{
  comment: Scalars['String'];
  parentId: Scalars['Int'];
  postId: Scalars['Int'];
}>;


export type CreateReplyMutation = { __typename?: 'Mutation', createReply: { __typename?: 'Comment', id: number, createdAt: any, comment: string, parentId?: number | null, isAuthor: boolean, author: { __typename?: 'User', id: number, name: string } } };

export type LikePostMutationVariables = Exact<{
  postId: Scalars['Int'];
}>;


export type LikePostMutation = { __typename?: 'Mutation', likePost: boolean };

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = { __typename?: 'Mutation', signIn: { __typename?: 'LoginResponse', accessToken: string, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type SignUpMutationVariables = Exact<{
  input: SignUpInput;
}>;


export type SignUpMutation = { __typename?: 'Mutation', signUp: { __typename?: 'SignUpResponse', accessToken: string, error?: { __typename?: 'Error', message: string, field: string } | null } };

export type UpdateCommentMutationVariables = Exact<{
  commentId: Scalars['Int'];
  newComment: Scalars['String'];
}>;


export type UpdateCommentMutation = { __typename?: 'Mutation', updateComment: { __typename?: 'Comment', id: number, createdAt: any, comment: string, parentId?: number | null, isAuthor: boolean, author: { __typename?: 'User', id: number, name: string } } };

export type GetAllPostsQueryVariables = Exact<{
  input: GetAllPostsInput;
}>;


export type GetAllPostsQuery = { __typename?: 'Query', allPosts: Array<{ __typename?: 'Post', id: number, title?: string | null, image: string, likeCount: number, likeStatus: boolean, createdAt: any, commentsCount: number, author: { __typename?: 'User', name: string } }> };

export type GetCommentsQueryVariables = Exact<{
  input: GetCommentsInput;
}>;


export type GetCommentsQuery = { __typename?: 'Query', getComments: Array<{ __typename?: 'Comment', id: number, createdAt: any, comment: string, parentId?: number | null, isAuthor: boolean, children?: Array<{ __typename?: 'Comment', id: number, createdAt: any, comment: string, parentId?: number | null, isAuthor: boolean, author: { __typename?: 'User', id: number, name: string } }> | null, author: { __typename?: 'User', id: number, name: string } }> };

export type ProfileQueryVariables = Exact<{
  name: Scalars['String'];
}>;


export type ProfileQuery = { __typename?: 'Query', profile?: { __typename?: 'User', id: number, name: string, postsCount: number, followersCount: number, followingCount: number, posts: Array<{ __typename?: 'Post', id: number, title?: string | null, image: string }> } | null };

export type NotificationSubscriptionVariables = Exact<{ [key: string]: never; }>;


export type NotificationSubscription = { __typename?: 'Subscription', notification?: { __typename?: 'NotificationEvent', eventType: NotificationEventType, notificationType: NotificationType, user?: { __typename?: 'User', id: number, name: string } | null } | null };

export const CommentDetailsFragmentDoc = gql`
    fragment CommentDetails on Comment {
  id
  createdAt
  comment
  parentId
  isAuthor
  author {
    id
    name
  }
}
    `;
export const CommentsCountFragmentDoc = gql`
    fragment CommentsCount on Post {
  commentsCount
}
    `;
export const LikeStatusFragmentDoc = gql`
    fragment LikeStatus on Post {
  likeStatus
  likeCount
}
    `;
export const CreateCommentDocument = gql`
    mutation CreateComment($comment: String!, $postId: Int!) {
  createComment(comment: $comment, postId: $postId) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;
export type CreateCommentMutationFn = Apollo.MutationFunction<CreateCommentMutation, CreateCommentMutationVariables>;

/**
 * __useCreateCommentMutation__
 *
 * To run a mutation, you first call `useCreateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createCommentMutation, { data, loading, error }] = useCreateCommentMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateCommentMutation(baseOptions?: Apollo.MutationHookOptions<CreateCommentMutation, CreateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateCommentMutation, CreateCommentMutationVariables>(CreateCommentDocument, options);
      }
export type CreateCommentMutationHookResult = ReturnType<typeof useCreateCommentMutation>;
export type CreateCommentMutationResult = Apollo.MutationResult<CreateCommentMutation>;
export type CreateCommentMutationOptions = Apollo.BaseMutationOptions<CreateCommentMutation, CreateCommentMutationVariables>;
export const CreateReplyDocument = gql`
    mutation CreateReply($comment: String!, $parentId: Int!, $postId: Int!) {
  createReply(comment: $comment, parentId: $parentId, postId: $postId) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;
export type CreateReplyMutationFn = Apollo.MutationFunction<CreateReplyMutation, CreateReplyMutationVariables>;

/**
 * __useCreateReplyMutation__
 *
 * To run a mutation, you first call `useCreateReplyMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useCreateReplyMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [createReplyMutation, { data, loading, error }] = useCreateReplyMutation({
 *   variables: {
 *      comment: // value for 'comment'
 *      parentId: // value for 'parentId'
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useCreateReplyMutation(baseOptions?: Apollo.MutationHookOptions<CreateReplyMutation, CreateReplyMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<CreateReplyMutation, CreateReplyMutationVariables>(CreateReplyDocument, options);
      }
export type CreateReplyMutationHookResult = ReturnType<typeof useCreateReplyMutation>;
export type CreateReplyMutationResult = Apollo.MutationResult<CreateReplyMutation>;
export type CreateReplyMutationOptions = Apollo.BaseMutationOptions<CreateReplyMutation, CreateReplyMutationVariables>;
export const LikePostDocument = gql`
    mutation LikePost($postId: Int!) {
  likePost(postId: $postId)
}
    `;
export type LikePostMutationFn = Apollo.MutationFunction<LikePostMutation, LikePostMutationVariables>;

/**
 * __useLikePostMutation__
 *
 * To run a mutation, you first call `useLikePostMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikePostMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likePostMutation, { data, loading, error }] = useLikePostMutation({
 *   variables: {
 *      postId: // value for 'postId'
 *   },
 * });
 */
export function useLikePostMutation(baseOptions?: Apollo.MutationHookOptions<LikePostMutation, LikePostMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<LikePostMutation, LikePostMutationVariables>(LikePostDocument, options);
      }
export type LikePostMutationHookResult = ReturnType<typeof useLikePostMutation>;
export type LikePostMutationResult = Apollo.MutationResult<LikePostMutation>;
export type LikePostMutationOptions = Apollo.BaseMutationOptions<LikePostMutation, LikePostMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  signIn(input: $input) {
    accessToken
    error {
      message
      field
    }
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
export const SignUpDocument = gql`
    mutation SignUp($input: SignUpInput!) {
  signUp(input: $input) {
    error {
      message
      field
    }
    accessToken
  }
}
    `;
export type SignUpMutationFn = Apollo.MutationFunction<SignUpMutation, SignUpMutationVariables>;

/**
 * __useSignUpMutation__
 *
 * To run a mutation, you first call `useSignUpMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useSignUpMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [signUpMutation, { data, loading, error }] = useSignUpMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useSignUpMutation(baseOptions?: Apollo.MutationHookOptions<SignUpMutation, SignUpMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<SignUpMutation, SignUpMutationVariables>(SignUpDocument, options);
      }
export type SignUpMutationHookResult = ReturnType<typeof useSignUpMutation>;
export type SignUpMutationResult = Apollo.MutationResult<SignUpMutation>;
export type SignUpMutationOptions = Apollo.BaseMutationOptions<SignUpMutation, SignUpMutationVariables>;
export const UpdateCommentDocument = gql`
    mutation UpdateComment($commentId: Int!, $newComment: String!) {
  updateComment(commentId: $commentId, newComment: $newComment) {
    ...CommentDetails
  }
}
    ${CommentDetailsFragmentDoc}`;
export type UpdateCommentMutationFn = Apollo.MutationFunction<UpdateCommentMutation, UpdateCommentMutationVariables>;

/**
 * __useUpdateCommentMutation__
 *
 * To run a mutation, you first call `useUpdateCommentMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUpdateCommentMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [updateCommentMutation, { data, loading, error }] = useUpdateCommentMutation({
 *   variables: {
 *      commentId: // value for 'commentId'
 *      newComment: // value for 'newComment'
 *   },
 * });
 */
export function useUpdateCommentMutation(baseOptions?: Apollo.MutationHookOptions<UpdateCommentMutation, UpdateCommentMutationVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useMutation<UpdateCommentMutation, UpdateCommentMutationVariables>(UpdateCommentDocument, options);
      }
export type UpdateCommentMutationHookResult = ReturnType<typeof useUpdateCommentMutation>;
export type UpdateCommentMutationResult = Apollo.MutationResult<UpdateCommentMutation>;
export type UpdateCommentMutationOptions = Apollo.BaseMutationOptions<UpdateCommentMutation, UpdateCommentMutationVariables>;
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
    commentsCount
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
export const GetCommentsDocument = gql`
    query GetComments($input: GetCommentsInput!) {
  getComments(input: $input) @connection(key: "comments") {
    ...CommentDetails
    children {
      ...CommentDetails
    }
  }
}
    ${CommentDetailsFragmentDoc}`;

/**
 * __useGetCommentsQuery__
 *
 * To run a query within a React component, call `useGetCommentsQuery` and pass it any options that fit your needs.
 * When your component renders, `useGetCommentsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useGetCommentsQuery({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useGetCommentsQuery(baseOptions: Apollo.QueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
      }
export function useGetCommentsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<GetCommentsQuery, GetCommentsQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<GetCommentsQuery, GetCommentsQueryVariables>(GetCommentsDocument, options);
        }
export type GetCommentsQueryHookResult = ReturnType<typeof useGetCommentsQuery>;
export type GetCommentsLazyQueryHookResult = ReturnType<typeof useGetCommentsLazyQuery>;
export type GetCommentsQueryResult = Apollo.QueryResult<GetCommentsQuery, GetCommentsQueryVariables>;
export const ProfileDocument = gql`
    query Profile($name: String!) {
  profile(name: $name) {
    id
    name
    postsCount
    followersCount
    followingCount
    posts {
      id
      title
      image
    }
  }
}
    `;

/**
 * __useProfileQuery__
 *
 * To run a query within a React component, call `useProfileQuery` and pass it any options that fit your needs.
 * When your component renders, `useProfileQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useProfileQuery({
 *   variables: {
 *      name: // value for 'name'
 *   },
 * });
 */
export function useProfileQuery(baseOptions: Apollo.QueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
      }
export function useProfileLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<ProfileQuery, ProfileQueryVariables>) {
          const options = {...defaultOptions, ...baseOptions}
          return Apollo.useLazyQuery<ProfileQuery, ProfileQueryVariables>(ProfileDocument, options);
        }
export type ProfileQueryHookResult = ReturnType<typeof useProfileQuery>;
export type ProfileLazyQueryHookResult = ReturnType<typeof useProfileLazyQuery>;
export type ProfileQueryResult = Apollo.QueryResult<ProfileQuery, ProfileQueryVariables>;
export const NotificationDocument = gql`
    subscription Notification {
  notification {
    eventType
    notificationType
    user {
      id
      name
    }
  }
}
    `;

/**
 * __useNotificationSubscription__
 *
 * To run a query within a React component, call `useNotificationSubscription` and pass it any options that fit your needs.
 * When your component renders, `useNotificationSubscription` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the subscription, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useNotificationSubscription({
 *   variables: {
 *   },
 * });
 */
export function useNotificationSubscription(baseOptions?: Apollo.SubscriptionHookOptions<NotificationSubscription, NotificationSubscriptionVariables>) {
        const options = {...defaultOptions, ...baseOptions}
        return Apollo.useSubscription<NotificationSubscription, NotificationSubscriptionVariables>(NotificationDocument, options);
      }
export type NotificationSubscriptionHookResult = ReturnType<typeof useNotificationSubscription>;
export type NotificationSubscriptionResult = Apollo.SubscriptionResult<NotificationSubscription>;