"use client";
import UserInfo from "@/components/user/UserInfo";
import useFetch from "@/hooks/useFetch";
import { useParams } from "next/navigation";
import { RecentActivitySection } from "@/components/user/UserActivities";
interface Activity {
  userId: string;
  tmdbId: number;
  type: string;
  id: number;
  posterPath: number;
  name: string;
  description: string;
  createdOn: string;
  stars: number;
}
interface User {
  id: string;
  fullName: string;
  profilePic: string;
  isFollowing: boolean;
  userRecentActivityResponses: Activity[];
}

const UserPage = () => {
  const params = useParams();
  const userId = params.userId;
  const { data, loading } = useFetch<User>(
    `/api/UserFollow/follow-details/${userId}`
  );

  const userInfo = {
    id: data?.id,
    fullName: data?.fullName,
    profilePic: data?.profilePic,
    isFollowing: data?.isFollowing,
  };
  return (
    <div className="mt-24 px-10">
      <UserInfo {...userInfo} loading={loading} />
      <RecentActivitySection
        activities={data?.userRecentActivityResponses}
        loading={loading}
      />
    </div>
  );
};

export default UserPage;
