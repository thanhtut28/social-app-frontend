import PostCard from "@/components/postCard";
import { useGetAllPostsQuery } from "@/generated/graphql";
import type { NextPage } from "next";

const Home: NextPage = () => {
   const { data, fetchMore } = useGetAllPostsQuery({ variables: { input: { limit: 10 } } });

   return (
      <div className="max-w-4xl mx-auto flex flex-col justify-center items-center">
         <div className="flex w-full">
            <div className="sm:p-8 flex flex-col justify-between items-center w-full">
               {data?.allPosts.map(post => (
                  <PostCard key={post.id} post={post} />
               ))}
            </div>
         </div>
      </div>
   );
};

export default Home;
