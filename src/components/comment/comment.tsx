import { formatDate } from "@/utils/formatPostDate";
import Image from "next/image";
import { Dispatch, SetStateAction, useState } from "react";
import type { Comments, Modes } from "./comments";

const Comment: React.FC<{
   comment: Comments[number];
   replyId: number | null;
   setReplyId: Dispatch<SetStateAction<number | null>>;
   updateId: number | null;
   setUpdateId: Dispatch<SetStateAction<number | null>>;
   mode: keyof typeof Modes | null;
   setMode: Dispatch<SetStateAction<"UPDATE" | "REPLY" | null>>;
}> = ({ comment, replyId, setReplyId, updateId, setUpdateId, mode, setMode }) => {
   const [showReplies, setShowReplies] = useState<boolean>(false);

   const handleReply = () => {
      setReplyId(prev => (prev === comment.id ? null : comment.id));
      setMode(prev => (prev === "REPLY" && replyId === comment.id ? null : "REPLY"));
      setUpdateId(null);
   };

   const handleUpdate = () => {
      setUpdateId(prev => (prev === comment.id ? null : comment.id));
      setMode(prev => (prev === "UPDATE" && updateId === comment.id ? null : "UPDATE"));
      setReplyId(null);
   };

   return (
      <div className="flex py-2 w-full">
         <div className="flex w-full">
            <div className="flex-grow">
               <Image
                  className="inline-block rounded-full ring-8 ring-white"
                  src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                  alt="avatar-image"
                  width={42}
                  height={42}
                  layout="fixed"
               />
            </div>

            <div className="ml-4 w-full">
               <p className="text-sm">
                  <a className="font-semibold mr-1">{comment.author.name}</a>
                  {comment.comment}
               </p>
               <div className="flex items-center py-2">
                  <p className="text-xs text-slate-500 uppercase">
                     {formatDate(comment.createdAt)}
                  </p>

                  <div className="flex">
                     <button
                        className={`text-xs ${
                           mode === "REPLY" && replyId === comment.id
                              ? "text-sky-500"
                              : "text-slate-500"
                        } ml-4`}
                        onClick={handleReply}
                     >
                        Reply
                     </button>
                     {comment.isAuthor && (
                        <>
                           <span className="mx-2 text-slate-500">•</span>
                           <button
                              className={`text-xs text-${
                                 mode === "UPDATE" && updateId === comment.id ? "sky" : "slate"
                              }-500`}
                              onClick={handleUpdate}
                           >
                              Edit
                           </button>
                        </>
                     )}
                  </div>
               </div>
               {comment.children && comment.children.length > 0 && (
                  <div>
                     <div className="flex items-center py-2">
                        <hr className="w-10 border-slate-400" />
                        <button
                           className="text-xs text-slate-500 ml-4"
                           onClick={() => setShowReplies(prev => !prev)}
                        >
                           {!showReplies
                              ? `View Replies(${comment.children?.length})`
                              : `Hide Replies`}
                        </button>
                     </div>
                     {showReplies &&
                        comment.children.map(comment => (
                           <Comment
                              key={comment.id}
                              comment={comment}
                              replyId={replyId}
                              setReplyId={setReplyId}
                              updateId={updateId}
                              setUpdateId={setUpdateId}
                              mode={mode}
                              setMode={setMode}
                           />
                        ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export default Comment;

// ============================================================================================================

// let parentId = variables?.parentId;

// // beacause it is hard to get comment from nested array
// // I m done
// const { data: commentData } = await getComment({ variables: { id: parentId as number } });

// if (commentData?.getComment?.parentId) {
//    parentId = commentData?.getComment.parentId;
// }

// cache.updateQuery(
//    { query: GetCommentDocument, variables: { id: parentId as number } },
//    _data => {
//       return {
//          getComment: {
//             ..._data,
//             children: [..._data.getComment.children, { ...data?.createReply }],
//          },
//       };
//    }
// );

// cache.updateQuery(
//    {
//       query: GetCommentsDocument,
//       variables: { input: { limit: 3, postId } },
//    },
//    (_data: any) => {
//       console.log(_data);
//       let parentId: number | null | undefined = variables?.parentId;
//       const parentComment = _data?.getComments.find(
//          (comment: any) => comment.id === parentId
//       );
//       if (!parentComment) {
//          const childComment = _data?.getComments
//             .flatMap((c: any) => c.children)
//             .find((comment: any) => comment?.parentId === parentId);
//          parentId = childComment?.parentId;
//       }

//       const result = {
//          getComments: _data?.getComments.map((comment: any) => {
//             if (comment.id === parentId) {
//                return {
//                   ...comment,
//                   children: [...comment.children, { ...data?.createReply }],
//                };
//             }
//             return comment;
//          }),
//       };
//       console.log(result);
//       return result;
//    }
// );

// cache.updateFragment(
//    {
//       id: `Comment:${replyId}`,
//       fragment: gql`
//          fragment CommentDetailsFrag on Comment {
//             id
//             createdAt
//             comment
//             parentId
//             author {
//                id
//                name
//             }
//             children {
//                id
//                createdAt
//                comment
//                parentId
//                author {
//                   id
//                   name
//                }
//             }
//          }
//       `,
//    },

//    (_data: any) => {
//       // console.log("data", _data);
//       // return { ..._data, children: [..._data.children, { ...data?.createReply }] };
//    }
// );

// return cache.updateFragment(
//    {
//       id: `Post:${variables?.postId}`,
//       fragment: CommentsCountFragmentDoc,
//    },
//    (_data: any) => ({
//       ..._data,
//       commentsCount: _data.commentsCount + 1,
//    })
// );
