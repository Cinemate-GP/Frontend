"use client";
import UserInfo from "@/components/user/UserInfo";
import useFetch from "@/hooks/useFetch";
import { redirect, useParams } from "next/navigation";
import { RecentActivitySection } from "@/components/user/UserActivities";
import { getUserId } from "@/lib/utils";
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
  if (userId === getUserId()) {
    redirect("/profile");
  }
  const { data: info, loading } = useFetch<User>(
    `/api/UserFollow/follow-details/${userId}`
  );

  const userInfo = {
    id: info?.id,
    fullName: info?.fullName,
    profilePic: info?.profilePic,
    isFollowing: info?.isFollowing,
  };
  return (
    <div className="mt-24 px-10">
      <UserInfo {...userInfo} loading={loading} />
      <RecentActivitySection
        activities={info?.userRecentActivityResponses}
        loading={loading}
      />
    </div>
  );
};

export default UserPage;
