"use client";
import Image from "next/image";
import {useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import ProfileImageViewer from "./ProfileImageViewer";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import useFetch from "@/hooks/useFetch";
import { ProfileHeaderSkeleton } from "../skeletons";
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
interface UserInfo extends User {
  numberOfMovie: number;
  followingCount: number;
  followersCount: number;
  sameUser: boolean;
  isFollowing: boolean;
}

const ProfileHeader = ({ userId }: { userId: string }) => {


  const router = useRouter();
  const { refreshUserData } = useUser();

  const [followersCount, setFollowersCount] = useState<number>(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  const token = getCookie("token") as string;
  const { data: user, loading } = useFetch<UserInfo | null>(
    `/api/Profile/details/${userId}`
  );
  const [follow, setFollow] = useState<boolean>(user?.isFollowing ?? false);
  useEffect(() => {
    setFollowersCount(user?.followersCount ?? 0);
    setFollow(user?.isFollowing ?? false);
  }, [user?.isFollowing, user?.followersCount]);

  const toggleFollow = async () => {
  
    try {
      setFollowingLoading(true);
      const endpoint = follow
        ? "/api/UserFollow/Delete"
        : "/api/UserFollow/Add";
      const method = follow ? "DELETE" : "POST";

      const res = await authFetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: getUserId(), followId: user?.userName }),
      });

      if (!res.ok) throw new Error("Failed to toggle follow status");

      // Update local follow state
      setFollow(!follow);

      // Update follower count based on action
      setFollowersCount((prevCount) =>
        follow ? prevCount - 1 : prevCount + 1
      );
    } catch (error) {
      console.error(error);
    } finally {
      setFollowingLoading(false);
    }
  };

  useEffect(() => {
    refreshUserData();
  }, [refreshUserData]);

  const handleNavigateToSettings = () => {
    router.push("/settings");
  };

  if (loading) return <ProfileHeaderSkeleton />;
  return (
    <>
      <header className="backdrop-blur-sm bg-secondaryBg rounded-xl shadow-md p-6">
        <div className="flex flex-col sm:flex-row gap-6 justify-between">
          <div className="flex flex-row items-center gap-6">
            {/* Profile image - with click handler */}
            <div
              onClick={() => setShowImageViewer(true)}
              className="cursor-pointer transition-transform hover:scale-105"
            >
              <Image
                src={user?.profilePic || "/user-placeholder.jpg"}
                alt="user profile"
                width={100}
                height={100}
                className="w-24 h-24 rounded-full object-cover shadow-md border border-primary p-[1px]"
                priority={true}
              />
            </div>

            {/* Profile information */}
            <div className="flex-1 sm:text-left">
              <h2 className="text-lg sm:text-2xl font-bold text-foreground mb-1">
                {user?.fullName || "User Name"}
              </h2>
              <p className="text-sm text-gray-500">{user?.userName}</p>

              {user?.sameUser ? (
                <button
                  onClick={handleNavigateToSettings}
                  className="bg-background hover:bg-hoverBg text-foreground mt-2 px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-600"
                >
                  Edit Profile
                </button>
              ) : (
                <button
                  disabled={followingLoading}
                  onClick={toggleFollow}
                  className={`rounded-lg px-3 py-1 border  border-primary text-sm mt-2 ${
                    follow ? "bg-primary text-white" : "text-foreground"
                  }`}
                >
                  {follow ? "Followed" : "Follow"}
                </button>
              )}
            </div>
          </div>

          {/* Stats row - moved to the right */}
          <div className="flex gap-6 mt-4 sm:mt-0">
            <div className="text-center">
              <span className="block text-xl font-bold">{user?.numberOfMovie}</span>
              <span className="text-sm text-gray-500">Films</span>
            </div>

            <Link
              href={`/follow/${userId}_followers`}
              className="text-center group"
            >
              <span className="block text-xl font-bold">{followersCount}</span>
              <span className="text-sm text-gray-500 group-hover:text-foreground transition-colors">
                Followers
              </span>
            </Link>

            <Link
              href={`/follow/${userId}_following`}
              className="text-center group"
            >
              <span className="block text-xl font-bold">
                {user?.followingCount}
              </span>
              <span className="text-sm text-gray-500 group-hover:text-foreground transition-colors">
                Following
              </span>
            </Link>
          </div>
        </div>
      </header>

      {/* Profile Image Viewer */}
      {showImageViewer && (
        <ProfileImageViewer
          imageUrl={user?.profilePic || "/user-placeholder.jpg"}
          onClose={() => setShowImageViewer(false)}
        />
      )}
    </>
  );
};

export default ProfileHeader;
