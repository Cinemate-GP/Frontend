import { useCookie } from "@/hooks/useCookie";
import { getUserId } from "@/lib/utils";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { ProfileHeaderSkeleton } from "../skeletons";
import { authFetch } from "@/lib/api";
import Link from "next/link";

interface User {
  id: string | undefined;
  fullName: string | undefined;
  profilePic: string | undefined;
  isFollowing?: boolean | undefined;
  loading: boolean;
}

const UserInfo = ({ id, fullName, profilePic, isFollowing, loading }: User) => {
  const [follow, setFollow] = useState<boolean>(isFollowing ?? false);
  const [followersCount, setFollowersCount] = useState<number>(0);
  const [followingCount, setFollowingCount] = useState<number>(0);
  const [filmsCount] = useState<number>(80); // Removed unused setter
  const token = useCookie();

  useEffect(() => {
    setFollow(isFollowing ?? false);
  }, [isFollowing]);

  // Fetch follower and following counts
  useEffect(() => {
    if (!id) return;
    const fetchFollowCounts = async () => {
      try {
        const res = await authFetch(`/api/UserFollow/count-follow/${id}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        if (!res.ok) throw new Error("Failed to fetch follow counts");
        const data = await res.json();
        console.log(data);
        setFollowersCount(data.followersCount);
        setFollowingCount(data.followingCount);
      } catch (error) {
        console.error("Error fetching follow counts:", error);
      }
    };

    fetchFollowCounts();
  }, [id, token]);

  const toggleFollow = async () => {
    try {
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
        body: JSON.stringify({ userId: getUserId(), followId: id }),
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
    }
  };

  if (loading) return <ProfileHeaderSkeleton />;
  return (
    <header className="flex flex-col sm:flex-row justify-between items-center gap-8">
      <div className="flex gap-4 items-center flex-wrap">
        <div className="border-2 border-primary p-1 rounded-full mx-auto sm:mx-0">
          {profilePic && (
            <Image
              src={profilePic}
              alt="user profile"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          )}
          {!profilePic && (
            <Image
              src="/user-placeholder.jpg"
              alt="user profile"
              width={100}
              height={100}
              className="w-16 h-16 sm:w-32 sm:h-32 rounded-full object-cover"
            />
          )}
        </div>
        <div className="flex items-center mx-auto sm:mx-0">
          <span className="block w-[6px] h-6 rounded-xl bg-primary mr-2"></span>
          <h2 className="text-lg sm:text-3xl">
            {fullName ? fullName : "User Name"}
          </h2>

          <button
            onClick={toggleFollow}
            className={`rounded-lg px-3 py-1 border border-primary text-sm ml-3 ${
              follow ? "bg-primary" : ""
            }`}
          >
            {follow ? "Followed" : "follow"}
          </button>
        </div>
      </div>
      <ul className="flex gap-3 justify-center sm:justify-start">
        <li className="text-center">
          <span className="block text-xl font-bold">{filmsCount}</span>
          <span className="text-sm text-zinc-400">Films</span>
        </li>
        <Link href={`/followers`} className="text-center group">
          <span className="block text-xl font-bold">{followersCount}</span>
          <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
            Followers
          </span>
        </Link>
        <Link href={`/followers`} className="text-center group">
          <span className="block text-xl font-bold">{followingCount}</span>
          <span className="text-sm text-zinc-400 group-hover:text-white transition-colors">
            Following
          </span>
        </Link>
      </ul>
    </header>
  );
};

export default UserInfo;
