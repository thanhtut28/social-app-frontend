import { Dispatch, SetStateAction } from "react";
import EmojiIcon from "./icons/emoji";

interface Props {
   comment: string;
   setComment: Dispatch<SetStateAction<string>>;
   handleAddComment: () => void;
   addingComment: boolean;
}

const CommentInput: React.FC<Props> = ({
   comment,
   setComment,
   handleAddComment,
   addingComment,
}) => {
   return (
      <div className="py-2 flex justify-between items-center">
         <div className="flex items-center">
            <div className="p-2">
               <EmojiIcon />
            </div>
            <input
               type="text"
               placeholder="Add a comment"
               className="appearance-none block ring-0 border-0 focus:ring-0 p-0 focus:outline-none w-full placeholder:text-slate-400"
               value={comment}
               onChange={e => setComment(e.target.value)}
            />
         </div>
         <div className="pr-3 flex items-center justify-center">
            <button
               className={`text-sky-500 font-semibold disabled:opacity-30 nline-flex w-full justify-center items-center ${
                  addingComment && "pointer-events-none"
               }`}
               disabled={comment.trim().length === 0}
               onClick={handleAddComment}
            >
               {addingComment ? (
                  <svg
                     className="mr-3 h-5 w-5 animate-spin text-indigo"
                     xmlns="http://www.w3.org/2000/svg"
                     fill="none"
                     viewBox="0 0 24 24"
                  >
                     <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth={4}
                     ></circle>
                     <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                     ></path>
                  </svg>
               ) : (
                  `Post`
               )}
            </button>
         </div>
      </div>
   );
};

export default CommentInput;
