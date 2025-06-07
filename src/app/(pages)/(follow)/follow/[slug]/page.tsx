"use client";
import SectionTitle from "@/components/SectionTitle";
import {FollowItemSkeleton} from "@/components/skeletons";
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface User {
  userId: string;
  fullName: string;
  profilePic: string;
  isFollow: boolean;
}

function FollowTabs() {
  const params = useParams();
  const slug = params.slug as string;
  const userId = slug.split("_")[0];
  const type = slug.split("_")[1] as "followers" | "following";
  const token = getCookie("token");

  const [activeTab, setActiveTab] = useState<"followers" | "following">(
    type
  );
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>(
    {}
  );
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const endpoint =
        activeTab === "followers"
          ? `/api/UserFollow/get-all-followers/${userId}`
          : `/api/UserFollow/get-all-following/${userId}`;

      const res = await authFetch(endpoint, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) throw new Error("Failed to fetch users");

      const result: User[] = await res.json();
      console.log(result)
      setData(result);
    } catch (error) {
      console.error(error);
      setData([]);
    } finally {
      setLoading(false);
    }
  }, [activeTab, token, userId]);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const toggleFollow = async (followId: string) => {
    try {
      const currentIsFollow =
        followedUsers[followId] !== undefined
          ? followedUsers[followId]
          : data?.find((user) => user.userId === followId)?.isFollow;

      const endpoint = currentIsFollow
        ? "/api/UserFollow/Delete"
        : "/api/UserFollow/Add";
      const method = currentIsFollow ? "DELETE" : "POST";

      const res = await authFetch(endpoint, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ userId: getUserId(), followId }),
      });

      if (!res.ok) throw new Error("Failed to toggle follow status");

      setFollowedUsers((prev) => ({
        ...prev,
        [followId]: !currentIsFollow,
      }));
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20">
        <div className="bg-secondaryBg rounded-lg p-6">          <SectionTitle title="Connections" />

          {/* Tabs */}
          <div className="flex gap-4 mb-8 mt-6">
        {["followers", "following"].map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab as "followers" | "following")}
            className={`px-4 py-2 rounded-md border ${
              activeTab === tab
                ? "bg-primary text-white border-primary"
                : "bg-secondaryBg text-foreground border-border"            }`}
          >
            {tab.charAt(0).toUpperCase() + tab.slice(1)}
          </button>
        ))}
      </div>

      {/* Data */}
      {loading && <FollowItemSkeleton />}
      {!loading && data?.length === 0 && <p>No {activeTab} found.</p>}
      {!loading && data && (
        <div className="flex flex-col gap-4 w-full">
          {data.map((user) => {
            const isCurrentlyFollowing =
              followedUsers[user.userId] !== undefined
                ? followedUsers[user.userId]
                : user.isFollow;

            return (              <div
                key={user.userId}
                className="flex justify-between items-center border-b border-border pb-4 last:border-b-0"
              >                <Link
                  href={`/user/${user.userId}`}
                  className="flex items-center gap-4 py-2"
                >
                  <Image
                    src={user.profilePic || "/user-placeholder.jpg"}
                    alt="user profile"
                    width={100}
                    height={100}
                    className="w-16 h-16 rounded-full object-cover"
                  />
                  <h2 className="text-lg">{user.fullName}</h2>
                </Link>

                {getUserId() !== user.userId && (
                  <button
                    onClick={() => toggleFollow(user.userId)}
                    className="rounded-lg px-3 py-1 border border-primary text-sm ml-3 text-foreground hover:text-white transition-all duration-200 hover:bg-primary"
                  >
                    {isCurrentlyFollowing ? "Unfollow" : "Follow"}
                  </button>
                )}
              </div>
            );
          })}        </div>
      )}
        </div>
      </div>
    </div>
  );
}

export default FollowTabs;
