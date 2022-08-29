interface Props {
   postsCount: number;
   followersCount: number;
   followingCount: number;
}

const MobileCounts: React.FC<Props> = ({ postsCount, followersCount, followingCount }) => {
   return (
      <ul className="flex justify-around py-2 mt-10 sm:hidden border-t border-b border-gray-300">
         <ConuntListItem count={postsCount} title="posts" />
         <ConuntListItem count={followersCount} title="followers" />
         <ConuntListItem count={followingCount} title="following" />
      </ul>
   );
};

const ConuntListItem: React.FC<{ count: number; title: string }> = ({ count, title }) => {
   return (
      <li className="flex flex-col items-center">
         <h6 className="font-semibold text-sm">{count}</h6>
         <p className="text-sm text-gray-500">{title}</p>
      </li>
   );
};

export default MobileCounts;
