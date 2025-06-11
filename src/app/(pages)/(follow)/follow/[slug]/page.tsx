"use client";
import SectionTitle from "@/components/SectionTitle";
import { FollowItemSkeleton } from "@/components/skeletons";
import { useProfile } from "@/context/FollowersContext";
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

  const [activeTab, setActiveTab] = useState<"followers" | "following">(type);
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>(
    {}
  );
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setFollowersCount, followersCount } = useProfile();

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    setErrorMessage(null);
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

      const result = await res.json();
      console.log(result);

      if (Array.isArray(result)) {
        setData(result);
      } else if (result?.errors) {
        setData(null);
        setErrorMessage(result.errors[1] || "An error occurred.");
      } else {
        setData(null);
        setErrorMessage("Unexpected response from server.");
      }
    } catch (error) {
      console.error(error);
      setData(null);
      setErrorMessage("Failed to fetch users.");
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
  const removeFollower = async (followerId: string) => {
    try {
      const res = await authFetch("/api/UserFollow/remove-follower", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ followerUserName: followerId }),
      });

      if (!res.ok) throw new Error("Failed to remove follower");

      setData(
        (prev) => prev?.filter((user) => user.userId !== followerId) || []
      );
      setFollowersCount(followersCount - 1);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20">
        <div className="bg-secondaryBg rounded-lg p-6">
          <SectionTitle title="Connections" />

          {/* Tabs */}
          <div className="flex gap-4 mb-8 mt-6">
            {["followers", "following"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab as "followers" | "following")}
                className={`px-4 py-2 rounded-md border ${
                  activeTab === tab
                    ? "bg-primary text-white border-primary"
                    : "bg-secondaryBg text-foreground border-border"
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
              </button>
            ))}
          </div>

          {/* Content */}
          {loading && <FollowItemSkeleton />}
          {!loading && errorMessage && (
            <p className="text-textMuted text-sm mb-4">{errorMessage}</p>
          )}
          {!loading && !errorMessage && data?.length === 0 && (
            <p>No {activeTab} found.</p>
          )}
          {!loading && !errorMessage && data && (
            <div className="flex flex-col gap-4 w-full">
              {data.map((user) => {
                const isCurrentlyFollowing =
                  followedUsers[user.userId] !== undefined
                    ? followedUsers[user.userId]
                    : user.isFollow;

                return (
                  <div
                    key={user.userId}
                    className="flex justify-between items-center border-b border-border pb-4 last:border-b-0"
                  >
                    <Link
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

                    <div className="flex gap-2 ">
                      {getUserId() !== user.userId && (
                        <button
                          onClick={() => toggleFollow(user.userId)}
                          className="rounded-lg px-3 py-1 border border-primary text-sm ml-3 text-foreground hover:text-white transition-all duration-200 hover:bg-primary"
                        >
                          {isCurrentlyFollowing ? "Unfollow" : "Follow"}
                        </button>
                      )}
                      {getUserId() !== user.userId &&
                        activeTab === "followers" && (
                          <button>
                            <button
                              onClick={() => removeFollower(user.userId)}
                              className="rounded-lg px-3 py-1 border border-primary text-sm ml-3 text-foreground hover:text-white transition-all duration-200 hover:bg-primary"
                            >
                              Remove
                            </button>
                          </button>
                        )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default FollowTabs;
