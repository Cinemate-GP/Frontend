"use client";
import useFetch from "@/hooks/useFetch";
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface User {
  userId: string;
  fullName: string;
  profilePic: string;
}

function Followers() {
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>({});
  const { data, loading } = useFetch<User[]>(
    `/api/UserFollow/get-all-following/${getUserId()}`
  );

  const token = getCookie('token');
  const toggleFollow = async (followId: string) => {
    try {
      const isFollowing = followedUsers[followId] ?? true; // default to true
  
      const endpoint = isFollowing
        ? "/api/UserFollow/Delete"
        : "/api/UserFollow/Add";
      const method = isFollowing ? "DELETE" : "POST";
  
      const res = await authFetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: getUserId(), followId }),
      });
  
      if (!res.ok) throw new Error("Failed to toggle follow status");
  
      // Toggle follow state for this user only
      setFollowedUsers((prev) => ({
        ...prev,
        [followId]: !isFollowing,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  
  return (
    <div className="col-span-4 md:col-span-3  w-full">
      {loading && <p>Loading...</p>}
      {!loading && data?.length === 0 && <p>No followings found</p>}
      {!loading && (data?.length as number) > 0 && (
        <div className="flex flex-col gap-4 w-full">
          {data?.map((user) => (
            <div key={user.userId} className="flex justify-between items-center border-b border-gray-700">
              <Link href={`/user/${user.userId}`} className="flex items-center gap-4 p-4 px-0">
                {user.profilePic ? (
                  <Image
                    src={user.profilePic}
                    alt="user profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                ) : (
                  <Image
                    src="/ueser-placeholder.jpg"
                    alt="user profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                )}
                <h2 className="text-lg">{user.fullName}</h2>
              </Link>
              <button onClick={() => toggleFollow(user.userId)} className="rounded-lg px-3 py-1 border border-primary text-sm ml-3 text-white transition-all duration-200 hover:bg-primary">
              {followedUsers[user.userId] ?? true ? "Unfollow" : "Follow"}
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Followers;
