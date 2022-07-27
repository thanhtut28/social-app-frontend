import {
   GetCommentsQuery,
   useCreateCommentMutation,
   useCreateReplyMutation,
} from "@/generated/graphql";
import { formatDate } from "@/utils/formatPostDate";
import { Dialog, Transition } from "@headlessui/react";
import Image from "next/image";
import { Dispatch, Fragment, SetStateAction, useEffect, useState } from "react";
import CommentInput from "../commentInput";
import CommentCloseIcon from "../icons/commentClose";

type Comments = GetCommentsQuery["getComments"];

interface Props {
   comments: Comments;
   open: boolean;
   setOpen: Dispatch<SetStateAction<boolean>>;
   postId: number;
}

const CommentsBox: React.FC<Props> = ({ comments, open, setOpen, postId }) => {
   const [reply, setReply] = useState<string>("");
   const [cmtOrRp, setCmtOrRp] = useState<boolean>(false);
   const [replyId, setReplyId] = useState<number | null>(null); // default cmt

   const [addComment, { loading: addingComment }] = useCreateCommentMutation({
      variables: { comment: reply, postId },
   });
   const [addReply, { loading: addingReply }] = useCreateReplyMutation({
      variables: { comment: reply, parentId: replyId as number, postId },
   });

   const loading = addingComment || addingReply;

   useEffect(() => {
      if (replyId) {
         return setCmtOrRp(true);
      }
      return setCmtOrRp(false);
   }, [replyId]);

   function closeModal() {
      setOpen(false);
   }

   const handleAddReply = () => {
      addReply().then(() => setReply(""));
   };

   const handleAddComment = () => {
      addComment().then(() => setReply(""));
   };

   return (
      <Transition appear show={open} as={Fragment}>
         <Dialog as="div" className="relative z-10" onClose={closeModal}>
            <Transition.Child
               as={Fragment}
               enter="ease-out duration-300"
               enterFrom="opacity-0"
               enterTo="opacity-100"
               leave="ease-in duration-200"
               leaveFrom="opacity-100"
               leaveTo="opacity-0"
            >
               <div className="fixed inset-0 bg-black bg-opacity-25" />
            </Transition.Child>

            <div className="fixed inset-0 overflow-y-auto">
               <div className="flex min-h-full items-center justify-center p-4 text-center">
                  <Transition.Child
                     as={Fragment}
                     enter="ease-out duration-300"
                     enterFrom="opacity-0 scale-95"
                     enterTo="opacity-100 scale-100"
                     leave="ease-in duration-200"
                     leaveFrom="opacity-100 scale-100"
                     leaveTo="opacity-0 scale-95"
                  >
                     <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-lg bg-white p-6 pb-0 text-left align-middle shadow-xl transition-all relative">
                        <Dialog.Title
                           as="h3"
                           className="text-lg text-center font-medium leading-6 text-gray-900"
                        >
                           Comments
                        </Dialog.Title>
                        <hr className="w-full border-slate-300 mt-2" />

                        <div className="mt-4 w-full">
                           {comments.map(comment => (
                              <Comment
                                 key={comment.id}
                                 comment={comment}
                                 replyId={replyId}
                                 setReplyId={setReplyId}
                              />
                           ))}
                        </div>
                        <hr className="w-full border-slate-300 mt-2" />
                        <CommentInput
                           comment={reply}
                           setComment={setReply}
                           handleAddComment={cmtOrRp ? handleAddReply : handleAddComment}
                           addingComment={loading}
                        />

                        {/* close icon */}
                        <div className="mt-4 absolute top-1 right-2">
                           <CommentCloseIcon closeModal={closeModal} />
                        </div>
                     </Dialog.Panel>
                  </Transition.Child>
               </div>
            </div>
         </Dialog>
      </Transition>
   );
};

export default CommentsBox;

const Comment: React.FC<{
   comment: Comments[number];
   replyId: number | null;
   setReplyId: Dispatch<SetStateAction<number | null>>;
}> = ({ comment, replyId, setReplyId }) => {
   const [showReplies, setShowReplies] = useState<boolean>(false);

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
               <div className="flex items-end py-2">
                  <p className="text-xs text-slate-500 uppercase">
                     {formatDate(comment.createdAt)}
                  </p>

                  <button
                     className={`text-xs text-${replyId === comment.id ? "sky" : "slate"}-500 ml-4`}
                     onClick={() => setReplyId(prev => (prev === comment.id ? null : comment.id))}
                  >
                     Reply
                  </button>
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
                           />
                        ))}
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};
