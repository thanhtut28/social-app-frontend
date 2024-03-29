interface Props {}

const EmojiIcon: React.FC<Props> = () => {
   return (
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
            d="M14.828 14.828a4 4 0 01-5.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
         />
      </svg>
   );
};

export default EmojiIcon;
