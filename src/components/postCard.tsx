import { GetAllPostsQuery } from "@/generated/graphql";
import Image from "next/image";

interface Props {
   post: GetAllPostsQuery["allPosts"][number];
}

const PostCard: React.FC<Props> = ({ post }) => {
   return (
      <div className="max-w-md w-full  border bg-white rounded-lg my-2">
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

            <svg
               xmlns="http://www.w3.org/2000/svg"
               className="h-5 w-5"
               viewBox="0 0 20 20"
               fill="currentColor"
               cursor="pointer"
            >
               <path d="M6 10a2 2 0 11-4 0 2 2 0 014 0zM12 10a2 2 0 11-4 0 2 2 0 014 0zM16 12a2 2 0 100-4 2 2 0 000 4z" />
            </svg>
         </div>
         <div>
            <Image
               src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
               alt="photo"
               width={448}
               height={560}
               layout="responsive"
            />
         </div>
         <div className="py-4"></div>
      </div>
   );
};

export default PostCard;
