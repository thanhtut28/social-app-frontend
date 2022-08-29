interface Props {
   postsCount: number;
   followersCount: number;
   followingCount: number;
}

const Counts: React.FC<Props> = ({ postsCount, followersCount, followingCount }) => {
   return (
      <ul className="hidden sm:flex py-8">
         <ConuntListItem count={postsCount} title="posts" />
         <ConuntListItem count={followersCount} title="followers" />
         <ConuntListItem count={followingCount} title="following" />
      </ul>
   );
};

const ConuntListItem: React.FC<{ count: number; title: string }> = ({ count, title }) => {
   return (
      <li className="flex items-center mr-6">
         <h6 className="pr-1 font-semibold text-sm">{count}</h6>
         <p className="text-sm text-gray-500">{title}</p>
      </li>
   );
};

export default Counts;
