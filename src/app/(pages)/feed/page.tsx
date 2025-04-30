"use client";
import FeedCard from "@/components/feed/FeedCard";
import { FeedCardSkelton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";

interface Feed {
  userId: string;
  userName: string;
  profilePic: string;
  type: string;
  id: number;
  posterPath: string;
  name: string;
  description: string;
  createdOn: string;
}
const FeedPage = () => {
  const { data: feeds, loading } = useFetch<Feed[] | null>("/api/Profile/feed");
  if (loading) return <FeedCardSkelton />;
  if(feeds?.length === 0 ) return <p className="text-gray-300 flex flex-col mt-24 p-4 mx-[0] sm:mx-8 mb-10 md:mb-0">Your Feeds Will Goes Here</p>
  return (
    <div className="flex flex-col mt-20 p-4 mx-[0] sm:mx-8 mb-10 md:mb-0 min-h-screen">
      {feeds?.map((feed) => (
        <FeedCard
          key={feed.createdOn}
          id={feed.id}
          userId={feed.userId}
          userName={feed.userName}
          profilePic={feed.profilePic}
          type={feed.type}
          posterPath={feed.posterPath}
          actionTitle={feed.name}
          description={feed.description}
          time={feed.createdOn}
        />
      ))}
    </div>
  );
};

export default FeedPage;
