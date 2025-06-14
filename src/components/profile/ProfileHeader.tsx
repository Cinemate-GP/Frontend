"use client";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useUser } from "@/context/UserContext";
import Link from "next/link";
import ProfileImageViewer from "./ProfileImageViewer";
import { useRouter } from "next/navigation";
import { User } from "@/lib/types";
import useFetch from "@/hooks/useFetch";
import { ProfileHeaderSkeleton } from "../skeletons";
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
import { FaRegEdit } from "react-icons/fa";
import { useFilterWatched } from "@/context/ProfileContext";
interface UserInfo extends User {
  numberOfMovie: number;
  followingCount: number;
  followersCount: number;
  sameUser: boolean;
  bio?: string;
  isFollowing: boolean;
}

const ProfileHeader = ({ userId }: { userId: string }) => {
  const router = useRouter();
  const { refreshUserData } = useUser();

  const [followersCount, setFollowersCount] = useState<number>(0);
  const [showImageViewer, setShowImageViewer] = useState(false);
  const [followingLoading, setFollowingLoading] = useState(false);
  const {flag, setFlag } = useFilterWatched();
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

  const handleClickFilm = () => {
    if (user?.sameUser) {
      router.push(`/${getUserId()}/watched`);
    } else {
      setFlag(!flag);
    }
  };  if (loading) return <ProfileHeaderSkeleton />;
  return (
    <>
      <header className="backdrop-blur-sm bg-secondaryBg rounded-xl shadow-md p-4 sm:p-6">
        {/* Mobile layout */}
        <div className="flex flex-col space-y-4 lg:hidden">
          {/* Top section: Profile image and basic info */}
          <div className="flex items-start gap-4">
            {/* Profile image */}
            <div
              onClick={() => setShowImageViewer(true)}
              className="cursor-pointer transition-transform hover:scale-105 flex-shrink-0"
            >
              <Image
                src={user?.profilePic || "/user-placeholder.jpg"}
                alt="user profile"
                width={80}
                height={80}
                className="w-20 h-20 rounded-full object-cover shadow-md border border-primary p-[1px]"
                priority={true}
              />
            </div>

            {/* Profile info and action button */}
            <div className="flex-1 min-w-0">
              {/* Name and username */}
              <div className="mb-2">
                <h2 className="text-lg font-bold text-foreground truncate">
                  {user?.fullName || "User Name"}
                </h2>
                <p className="text-sm text-textMuted">{user?.userName}</p>
              </div>

              {/* Action button - positioned in mobile layout */}
              <div>
                {user?.sameUser ? (
                  <button
                    onClick={handleNavigateToSettings}
                    className="bg-background hover:bg-hoverBg text-foreground px-3 py-1.5 rounded-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-600 flex items-center gap-2"
                  >
                    <FaRegEdit className="w-3 h-3" />
                    Edit Profile
                  </button>
                ) : (
                  <button
                    disabled={followingLoading}
                    onClick={toggleFollow}
                    className={`rounded-lg px-3 py-1.5 border border-primary text-sm transition-all duration-200 ${
                      follow ? "bg-primary text-white" : "text-foreground hover:bg-primary hover:text-white"
                    }`}
                  >
                    {follow ? "Following" : "Follow"}
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Bio section */}
          {user?.bio && (
            <div className="px-1">
              <p className="text-sm text-gray-400 leading-relaxed">{user.bio}</p>
            </div>
          )}

          {/* Stats row - full width on mobile */}
          <div className="flex justify-around pt-3 border-t border-border">
            <button onClick={handleClickFilm} className="text-center group flex-1">
              <span className="block text-lg font-bold text-foreground">
                {user?.numberOfMovie}
              </span>
              <span className="text-xs text-gray-500 group-hover:text-foreground transition-colors">
                Films
              </span>
            </button>
            
            <Link href={`/${userId}/followers`} className="text-center group flex-1">
              <span className="block text-lg font-bold text-foreground">{followersCount}</span>
              <span className="text-xs text-gray-500 group-hover:text-foreground transition-colors">
                Followers
              </span>
            </Link>
            
            <Link href={`/${userId}/following`} className="text-center group flex-1">
              <span className="block text-lg font-bold text-foreground">
                {user?.followingCount}
              </span>
              <span className="text-xs text-gray-500 group-hover:text-foreground transition-colors">
                Following
              </span>
            </Link>
          </div>
        </div>

        {/* Desktop layout - original design */}
        <div className="hidden lg:flex flex-col lg:flex-row gap-6 justify-between">
          <div className="flex flex-col md:flex-row items-center gap-6">
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
              <div className="flex gap-3 items-center justify-between">
                <h2 className="text-sm sm:text-2xl font-bold text-foreground">
                  {user?.fullName || "User Name"}
                </h2>
                {user?.sameUser ? (
                  <button
                    onClick={handleNavigateToSettings}
                    className="bg-background hover:bg-hoverBg text-foreground px-4 py-1.5 rounded-md transition-all duration-200 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-1 focus:ring-zinc-600"
                  >
                    <span className="hidden sm:block">Edit Profile</span>
                    <span className="block sm:hidden">
                      <FaRegEdit />
                    </span>
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

              <p className="text-sm text-textMuted mb-1">{user?.userName}</p>
              <p className="text-sm text-gray-400">{user?.bio}</p>
            </div>
          </div>

          {/* Stats row - moved to the right */}
          <div className="flex gap-6 items-center mt-4 sm:mt-0 border-t border-border pt-4 lg:border-none">
            <button onClick={handleClickFilm} className="text-center group">
              <span className="block text-xl font-bold">
                {user?.numberOfMovie}
              </span>
              <span className="text-sm text-gray-500 group-hover:text-foreground transition-colors">
                Films
              </span>
            </button>{" "}
            <Link href={`/${userId}/followers`} className="text-center group">
              <span className="block text-xl font-bold">{followersCount}</span>
              <span className="text-sm text-gray-500 group-hover:text-foreground transition-colors">
                Followers
              </span>
            </Link>
            <Link href={`/${userId}/following`} className="text-center group">
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
