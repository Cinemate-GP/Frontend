"use client";
import FeedCard from "@/components/feed/FeedCard";
import FeedCardSkelton from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";

interface Feed {
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
  console.log(feeds);
  if (loading)
    return (
      <>
        <FeedCardSkelton />
        <FeedCardSkelton />
        <FeedCardSkelton />
      </>
    );
  return (
    <div className="flex flex-col gap-4 mt-20 p-4 mx-[0] sm:mx-8 mb-10 md:mb-0">
      <FeedCard
        name="Hazem Helal"
        stars={4}
        time="10:30 AM • Apr 26"
        actionText="Rated the Matrix Movie"
        imageUrl="https://image.tmdb.org/t/p/original//qJ2tW6WMUDux911r6m7haRef0WH.jpg"
      />
      <FeedCard
        name="Hazem Helal"
        review="This is a fantastic movie, I loved it! , and i will recommend it to my friends"
        time="10:30 AM • Apr 26"
        actionText="Reviewed the Matrix Movie"
        imageUrl="https://image.tmdb.org/t/p/original//3L3l6LsiLGHkTG4RFB2aBA6BttB.jpg"
      />
    </div>
  );
};

export default FeedPage;
