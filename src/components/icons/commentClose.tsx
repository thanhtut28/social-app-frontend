interface Props {
   closeModal: () => void;
}

const CommentCloseIcon: React.FC<Props> = ({ closeModal }) => {
   return (
      <svg
         xmlns="http://www.w3.org/2000/svg"
         className="h-6 w-6 cursor-pointer"
         fill="none"
         viewBox="0 0 24 24"
         stroke="currentColor"
         strokeWidth={1.5}
         onClick={closeModal}
      >
         <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
      </svg>
   );
};

export default CommentCloseIcon;
