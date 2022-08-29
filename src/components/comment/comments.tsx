import {
   GetCommentsDocument,
   GetCommentsQuery,
   GetCommentsQueryResult,
   useCreateCommentMutation,
   useCreateReplyMutation,
   useUpdateCommentMutation,
} from "@/generated/graphql";
import { gql } from "@apollo/client";
import { Dialog } from "@headlessui/react";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import CommentInput from "./commentInput";
import CommentCloseIcon from "../icons/commentClose";
import CommentBox from "../modals/commentBox";
import Comment from "./comment";

export type Comments = GetCommentsQuery["getComments"];

interface Props {
   comments: Comments;
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   postId: number;
   fetchMoreComments: GetCommentsQueryResult["fetchMore"];
   cursor: number;
}

export enum Modes {
   UPDATE,
   REPLY,
}

type Mode = keyof typeof Modes;

const Comments: React.FC<Props> = ({
   comments,
   open,
   setOpen,
   postId,
   fetchMoreComments,
   cursor,
}) => {
   const [reply, setReply] = useState<string>("");
   const [replyId, setReplyId] = useState<number | null>(null); // default cmt
   const [hasMore, setHasMore] = useState<boolean>(true);
   const [updateId, setUpdateId] = useState<number | null>(null);
   const [mode, setMode] = useState<Mode | null>(null);

   // neglect all pagiantion and caching
   const [addComment, { loading: addingComment }] = useCreateCommentMutation({
      variables: { comment: reply, postId },
      update(cache, { data }) {
         cache.updateQuery(
            {
               query: GetCommentsDocument,
               variables: { input: { postId } },
            },
            _data => {
               console.log(_data);
               return {
                  getComments: [{ ...data?.createComment, children: [] }, ..._data.getComments],
               };
            }
         );
      },
   });

   const [addReply, { loading: addingReply }] = useCreateReplyMutation({
      variables: { comment: reply, parentId: replyId!, postId },
   });

   const [updateCommnet, { loading: updatingComment }] = useUpdateCommentMutation({
      variables: { commentId: updateId!, newComment: reply },
      update(cache, { data }) {
         cache.updateFragment(
            {
               id: `Comment:${data?.updateComment.id}`,
               fragment: gql`
                  fragment NewComment on Comment {
                     comment
                  }
               `,
            },
            _data => ({ ..._data, comment: data?.updateComment.comment })
         );
      },
   });

   const loading = addingComment || addingReply || updatingComment;

   const resetAll = () => {
      setReply("");
      setReplyId(null);
      setUpdateId(null);
      setMode(null);
   };

   function closeModal() {
      setOpen(false);
      resetAll();
   }

   const handleAddReply = () => {
      addReply().then(() => resetAll());
   };

   const handleAddComment = () => {
      addComment().then(() => resetAll());
   };

   const handleUpdateComment = () => {
      updateCommnet().then(() => resetAll());
   };

   const handleFetchMoreComments = () => {
      fetchMoreComments({
         variables: { input: { cursor, limit: 3, postId } },
      }).then(fetechMoreResult => setHasMore(fetechMoreResult.data.getComments.length > 0));
   };

   const handleSubmitAction = () => {
      if (mode === "UPDATE") {
         return handleUpdateComment();
      }
      if (mode === "REPLY") {
         return handleAddReply();
      }

      return handleAddComment();
   };

   return (
      <CommentBox open={open} closeModal={closeModal}>
         <Dialog.Title as="h3" className="text-lg text-center font-medium leading-6 text-gray-900">
            Comments
         </Dialog.Title>
         <hr className="w-full border-slate-300 mt-2" />

         <div className="mt-4 w-full max-h-[60vh] overflow-auto">
            {comments.map(comment => (
               <Comment
                  key={comment.id}
                  comment={comment}
                  replyId={replyId}
                  setReplyId={setReplyId}
                  updateId={updateId}
                  setUpdateId={setUpdateId}
                  setMode={setMode}
                  mode={mode}
               />
            ))}
         </div>
         {hasMore && (
            <button
               className="text-sm font-semibold text-slate-500 mt-4 hover:underline"
               onClick={handleFetchMoreComments}
            >
               View more comments
            </button>
         )}
         <hr className="w-full border-slate-300 mt-2" />
         <CommentInput
            comment={reply}
            setComment={setReply}
            handleAddComment={handleSubmitAction}
            addingComment={loading}
         />

         {/* close icon */}
         <div className="mt-4 absolute top-1 right-2">
            <CommentCloseIcon closeModal={closeModal} />
         </div>
      </CommentBox>
   );
};

export default Comments;
