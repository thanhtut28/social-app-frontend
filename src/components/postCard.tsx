import {
   CommentsCountFragmentDoc,
   GetAllPostsQuery,
   GetCommentsDocument,
   LikeStatusFragmentDoc,
   useCreateCommentMutation,
   useGetCommentsLazyQuery,
   useLikePostMutation,
} from "@/generated/graphql";
import { formatDate } from "@/utils/formatPostDate";
import Image from "next/image";
import { useState } from "react";
import CommentInput from "./commentInput";
import CommentIcon from "./icons/comment";
import LikeIcon from "./icons/like";
import MessageIcon from "./icons/message";
import TripleDotsIcon from "./icons/tripleDots";
import CommentsBox from "./modals/comments";

interface Props {
   post: GetAllPostsQuery["allPosts"][number];
}

const PostCard: React.FC<Props> = ({ post }) => {
   const [comment, setComment] = useState<string>("");
   const [showCommentsBox, setShowCommentsBox] = useState<boolean>(false);
   const [getComments, { data: comments }] = useGetCommentsLazyQuery();
   const [likePost, { loading: likingPost }] = useLikePostMutation({
      variables: { postId: post.id },
      update(cache) {
         return cache.updateFragment(
            {
               id: `Post:${post.id}`,
               fragment: LikeStatusFragmentDoc,
            },
            (data: any) => {
               return {
                  ...data,
                  likeStatus: !data.likeStatus,
                  likeCount: data.likeStatus ? data.likeCount - 1 : data.likeCount + 1,
               };
            }
         );
      },
   });

   const [addComment, { loading: addingComment }] = useCreateCommentMutation({
      variables: { postId: post.id, comment },
      update(cache, { data }) {
         // only updates commentsCount and not getComments Query
         return cache.updateFragment(
            {
               id: `Post:${post.id}`,
               fragment: CommentsCountFragmentDoc,
            },
            (data: any) => ({
               ...data,
               commentsCount: data.commentsCount + 1,
            })
         );
      },
   });

   const handleAddComment = () => {
      addComment().then(() => setComment(""));
   };

   const handleLikePost = async () => {
      if (likingPost) return;
      await likePost();
   };

   const handleShowComments = () => {
      getComments({
         variables: { input: { limit: 5, postId: post.id } },
      }).then(() => {
         setShowCommentsBox(true);
      });
   };

   return (
      <div className="max-w-md w-full border bg-white rounded-lg my-2">
         <div className="flex justify-between items-center px-2 py-2 w-full">
            <div className="flex items-center">
               <Image
                  className="inline-block rounded-full ring-8 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="avatar-image"
                  width={42}
                  height={42}
                  layout="fixed"
               />
               <a className="text-sm ml-3 font-semibold">{post.author.name}</a>
            </div>

            <TripleDotsIcon />
         </div>
         <div>
            <Image
               src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
               alt="photo"
               width={448}
               height={560}
               layout="responsive"
               className="object-cover"
            />
         </div>
         <div className="flex justify-between">
            <div className="flex">
               {/* love icon */}
               <div className="p-2">
                  <LikeIcon likeStatus={post.likeStatus} handleLikePost={handleLikePost} />
               </div>
               {/* comment icon */}
               <div className="p-2">
                  <CommentIcon handleShowComments={handleShowComments} />
               </div>
               <div className="p-2">
                  <svg
                     xmlns="http://www.w3.org/2000/svg"
                     className="h-7 w-7 cursor-pointer"
                     fill="none"
                     viewBox="0 0 24 24"
                     stroke="currentColor"
                     strokeWidth={1.5}
                  >
                     <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
                     />
                  </svg>
               </div>
            </div>
            <div className="p-2">
               <MessageIcon />
            </div>
         </div>
         <div className="pl-3">
            {post.likeCount > 0 && (
               <div className="py-1 select-none">
                  <p className="text-sm font-semibold">
                     {post.likeCount > 1 ? `${post.likeCount} likes` : `1 like`}
                  </p>
               </div>
            )}
            {post.title && (
               <div className="py-1">
                  <p className="text-sm">
                     <a className="font-semibold pr-2">{post.author.name}</a>
                     {post.title}
                  </p>
               </div>
            )}
            {post.commentsCount > 0 && (
               <>
                  <div className="py-1 cursor-pointer">
                     <button
                        className="text-sm text-slate-500"
                        onClick={handleShowComments}
                     >{`View all ${post.commentsCount} comments`}</button>
                  </div>
                  {comments?.getComments && (
                     <CommentsBox
                        comments={comments.getComments}
                        open={showCommentsBox}
                        setOpen={setShowCommentsBox}
                        postId={post.id}
                     />
                  )}
               </>
            )}

            {/* published date */}
            <div className="py-1">
               <p className="text-xs text-slate-500 uppercase">{formatDate(post.createdAt)}</p>
            </div>
         </div>

         <div className="border-t mt-2 border-slate-200" />

         {/* comment box */}
         <CommentInput
            comment={comment}
            setComment={setComment}
            handleAddComment={handleAddComment}
            addingComment={addingComment}
         />
      </div>
   );
};

export default PostCard;
