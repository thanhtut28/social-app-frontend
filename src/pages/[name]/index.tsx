import Counts from "@/components/profile/counts";
import MobileCounts from "@/components/profile/mobileCounts";
import Button from "@/components/utils/button";
import { useProfileQuery } from "@/generated/graphql";
import { getAccessToken } from "@/utils/getAccessToken";
import cn from "classnames";
import jwtDecode from "jwt-decode";
import { NextPage } from "next";
import Error from "next/error";
import Image from "next/image";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

const PROFILE_NAVIGATIONS = ["posts", "saved"] as const;
type Navigation = typeof PROFILE_NAVIGATIONS[number];

const Profile: NextPage = () => {
   const {
      query: { name },
   } = useRouter();

   const [isUserProfile, setIsUserProfile] = useState(false);
   const [activeTab, setActiveTab] = useState<Navigation>("posts");

   const { data, loading, error } = useProfileQuery({ variables: { name: name as string } });
   const profile = data?.profile;

   useEffect(() => {
      const accessToken = getAccessToken();
      const userId = (jwtDecode(accessToken!) as { userId: number }).userId;

      if (data?.profile?.id === userId) {
         setIsUserProfile(true);
      }
   }, [data?.profile?.id]);

   if (data && !data?.profile) {
      return <Error statusCode={404} />;
   }

   if (loading) return <h1>Loading...</h1>;

   const actions = isUserProfile ? (
      <Button className={cn("max-w-[15rem] w-full mt-2 sm:w-fit")}>Edit Profile</Button>
   ) : (
      <h1>Message</h1>
   );

   return (
      <>
         {profile && (
            <div>
               <div className="flex m-4">
                  <div className={cn("p-8 relative w-20 h-20 shrink-0", "sm:w-40 sm:h-40")}>
                     <Image
                        className={cn(
                           "inline-block rounded-full ring-8 ring-white object-cover w-full"
                        )}
                        src="https://images.unsplash.com/photo-1491528323818-fdd1faba62cc?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt="avatar-image"
                        layout="fill"
                     />
                  </div>
                  <div className="px-8 sm:px-12 md:px-16 lg:px-20 w-full">
                     <div className={cn(`flex flex-col sm:flex-row sm:items-center`)}>
                        <h2 className="text-3xl font-light">{profile.name}</h2>
                        <div className="sm:px-8 w-full">{actions}</div>
                     </div>
                     <Counts
                        postsCount={profile.postsCount}
                        followersCount={profile.followersCount}
                        followingCount={profile.followingCount}
                     />
                  </div>
               </div>

               <MobileCounts
                  postsCount={profile.postsCount}
                  followersCount={profile.followersCount}
                  followingCount={profile.followingCount}
               />
               <div className="w-full sm:my-20 sm:border-t sm:border-gray-300">
                  <ul className="flex justify-center">
                     {PROFILE_NAVIGATIONS.map(nav => (
                        <li
                           key={nav}
                           className={cn(
                              "uppercase text-xs font-medium p-4 mx-4 cursor-pointer border-t border-transparent",
                              {
                                 "border-black": nav === activeTab,
                              }
                           )}
                           onClick={() => setActiveTab(nav)}
                        >
                           {nav}
                        </li>
                     ))}
                  </ul>
               </div>
            </div>
         )}
      </>
   );
};

export default Profile;
