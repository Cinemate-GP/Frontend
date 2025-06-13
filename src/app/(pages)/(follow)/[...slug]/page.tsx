"use client";
import SectionTitle from "@/components/SectionTitle";
import { FollowItemSkeleton } from "@/components/skeletons";
import { useProfile } from "@/context/FollowersContext";
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

interface User {
  userId: string;
  fullName: string;
  profilePic: string;
  isFollow: boolean;
}

/**
 * FollowTabs Component
 *
 * Handles different scenarios:
 * 1. Own Profile - Followers Tab: Show Follow/Unfollow + Remove buttons
 * 2. Own Profile - Following Tab: Show Follow/Unfollow buttons (unfollow own following)
 * 3. Other's Profile - Followers Tab: Show Follow/Unfollow buttons only
 * 4. Other's Profile - Following Tab: Show Follow/Unfollow buttons only
 */

function FollowTabs() {
  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string[];
  const userId = slug[0];
  const type = slug[1] as "followers" | "following";
  const token = getCookie("token");
  const currentUserId = getUserId();
  const isOwnProfile = currentUserId === userId;

  const handleTabChange = (newTab: "followers" | "following") => {
    const newSlug = `${userId}/${newTab}`;
    router.push(`/${newSlug}`);
  };
  const [activeTab, setActiveTab] = useState<"followers" | "following">(type);
  const [followedUsers, setFollowedUsers] = useState<Record<string, boolean>>(
    {}
  );
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [loadingActions, setLoadingActions] = useState<Record<string, boolean>>(
    {}
  );
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const { setFollowersCount, followersCount } = useProfile();

  // Update activeTab when the route changes
  useEffect(() => {
    setActiveTab(type);
  }, [type]);

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
      setLoadingActions((prev) => ({ ...prev, [`follow_${followId}`]: true }));

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
        body: JSON.stringify({ userId: currentUserId, followId }),
      });

      if (!res.ok) throw new Error("Failed to toggle follow status");

      setFollowedUsers((prev) => ({
        ...prev,
        [followId]: !currentIsFollow,
      }));

      // Update followers count if we're on the current user's profile and affecting followers
      if (isOwnProfile && activeTab === "followers") {
        setFollowersCount(followersCount + (currentIsFollow ? -1 : 1));
      }
    } catch (error) {
      console.error("Error toggling follow:", error);
      alert("Failed to update follow status. Please try again.");
    } finally {
      setLoadingActions((prev) => ({ ...prev, [`follow_${followId}`]: false }));
    }
  };

  const removeFollower = async (followerId: string, followerName: string) => {
    // Confirm removal
    if (
      !window.confirm(
        `Are you sure you want to remove ${followerName} from your followers?`
      )
    ) {
      return;
    }

    try {
      setLoadingActions((prev) => ({
        ...prev,
        [`remove_${followerId}`]: true,
      }));

      const res = await authFetch("/api/UserFollow/remove-follower", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ followerUserName: followerId }),
      });

      if (!res.ok) throw new Error("Failed to remove follower");

      // Remove from data array
      setData(
        (prev) => prev?.filter((user) => user.userId !== followerId) || []
      );

      // Update followers count only if on own profile
      if (isOwnProfile) {
        setFollowersCount(followersCount - 1);
      }
    } catch (error) {
      console.error("Error removing follower:", error);
      alert("Failed to remove follower. Please try again.");
    } finally {
      setLoadingActions((prev) => ({
        ...prev,
        [`remove_${followerId}`]: false,
      }));
    }
  };

  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20">
        <div className="bg-secondaryBg rounded-lg p-6">
          <SectionTitle
            title={isOwnProfile ? "Your Connections" : "Connections"}
          />

          {/* Tabs */}
          <div className="flex gap-4 mb-8 mt-6">
            {["followers", "following"].map((tab) => (
              <button
                key={tab}
                onClick={() =>
                  handleTabChange(tab as "followers" | "following")
                }
                className={`px-4 py-2 rounded-md border transition-all duration-200 ${
                  activeTab === tab
                    ? "bg-primary text-white border-primary"
                    : "bg-secondaryBg text-foreground border-border hover:border-primary"
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
            <p className="text-center text-textMuted py-8">
              {isOwnProfile
                ? `You have no ${activeTab} yet.`
                : `This user has no ${activeTab} yet.`}
            </p>
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
                    {" "}
                    <Link
                      href={`/${user.userId}`}
                      className="flex items-center gap-4 py-2"
                    >
                      <Image
                        src={user.profilePic || "/user-placeholder.jpg"}
                        alt="user profile"
                        width={100}
                        height={100}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div>
                        <h2 className="text-lg">{user.fullName}</h2>
                        {currentUserId === user.userId && (
                          <span className="text-sm text-primary">You</span>
                        )}
                      </div>
                    </Link>
                    <div className="flex gap-2 ">
                      {/* Show Follow/Unfollow button for users that are not the current user */}
                      {currentUserId !== user.userId && (
                        <button
                          onClick={() => toggleFollow(user.userId)}
                          disabled={loadingActions[`follow_${user.userId}`]}
                          className="rounded-lg px-3 py-1 border border-primary text-sm ml-3 text-foreground hover:text-white transition-all duration-200 hover:bg-primary disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {loadingActions[`follow_${user.userId}`]
                            ? "..."
                            : isCurrentlyFollowing
                            ? "Unfollow"
                            : "Follow"}
                        </button>
                      )}
                      {/* Show Remove button only on own profile's followers tab */}
                      {isOwnProfile &&
                        activeTab === "followers" &&
                        currentUserId !== user.userId && (
                          <button
                            onClick={() =>
                              removeFollower(user.userId, user.fullName)
                            }
                            disabled={loadingActions[`remove_${user.userId}`]}
                            className="rounded-lg px-3 py-1 border border-red-500 text-sm text-red-500 hover:text-white transition-all duration-200 hover:bg-red-500 disabled:opacity-50 disabled:cursor-not-allowed"
                          >
                            {loadingActions[`remove_${user.userId}`]
                              ? "..."
                              : "Remove"}
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
