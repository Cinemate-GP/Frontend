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
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8 pb-20">        {/* Main Card with Modern Design */}
        <div className="bg-secondaryBg rounded-2xl shadow-modern-card backdrop-blur-card border-0 overflow-hidden">
          {/* Header Section */}
          <div className="p-6 sm:p-8 border-b border-b-border/10 bg-gradient-to-r from-secondaryBg to-secondaryBg/80">
            <SectionTitle
              title={isOwnProfile ? "Your Connections" : "Connections"}
            />

            {/* Modern Tab Navigation */}
            <div className="flex bg-background/20 rounded-xl p-1 mt-6 backdrop-blur-sm border-0">
              {["followers", "following"].map((tab) => (
                <button
                  key={tab}
                  onClick={() =>
                    handleTabChange(tab as "followers" | "following")
                  }
                  className={`flex-1 px-4 py-3 rounded-lg text-sm font-medium transition-all duration-300 transform hover:scale-[1.02] border-0 ${
                    activeTab === tab
                      ? "bg-primary text-white shadow-lg shadow-primary/25"
                      : "text-textMuted hover:text-foreground hover:bg-hoverBg/30"
                  }`}
                >
                  {tab.charAt(0).toUpperCase() + tab.slice(1)}
                </button>
              ))}
            </div>
          </div>

          {/* Content Section */}
          <div className="p-6 sm:p-8">
            {/* Loading State */}
            {loading && (
              <div className="space-y-4">
                <FollowItemSkeleton />
              </div>
            )}

            {/* Error State */}
            {!loading && errorMessage && (
              <div className="text-center py-12">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-500/10 flex items-center justify-center">
                  <svg className="w-8 h-8 text-red-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <p className="text-textMuted text-sm">{errorMessage}</p>
              </div>
            )}

            {/* Empty State */}
            {!loading && !errorMessage && data?.length === 0 && (
              <div className="text-center py-16">
                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-primary/10 flex items-center justify-center">
                  <svg className="w-10 h-10 text-primary/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  No {activeTab} yet
                </h3>
                <p className="text-textMuted text-sm max-w-sm mx-auto">
                  {isOwnProfile
                    ? `You haven't ${activeTab === "followers" ? "gained any followers" : "followed anyone"} yet. Start connecting with others!`
                    : `This user has no ${activeTab} to show.`}
                </p>
              </div>
            )}

            {/* Users List */}
            {!loading && !errorMessage && data && data.length > 0 && (
              <div className="space-y-3">
                {data.map((user, index) => {
                  const isCurrentlyFollowing =
                    followedUsers[user.userId] !== undefined
                      ? followedUsers[user.userId]
                      : user.isFollow;

                  return (                    <div
                      key={user.userId}
                      className="group bg-background/40 hover:bg-background/60 rounded-xl p-4 transition-all duration-300 hover:shadow-modern border-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s` }}
                    ><div className="flex items-center justify-between space-x-3">
                        {/* User Info */}
                        <Link
                          href={`/${user.userId}`}
                          className="flex items-center space-x-3 flex-1 min-w-0 hover:opacity-90 transition-opacity"
                        >
                          <div className="relative flex-shrink-0">
                            <Image
                              src={user.profilePic || "/user-placeholder.jpg"}
                              alt={`${user.fullName}'s profile`}
                              width={48}
                              height={48}
                              className="w-10 h-10 sm:w-14 sm:h-14 rounded-full object-cover ring-2 ring-transparent group-hover:ring-primary/20 transition-all duration-300"
                            />
                            {currentUserId === user.userId && (
                              <div className="absolute -top-1 -right-1 w-3 h-3 sm:w-4 sm:h-4 bg-primary rounded-full flex items-center justify-center">
                                <svg className="w-2 h-2 sm:w-2.5 sm:h-2.5 text-white" fill="currentColor" viewBox="0 0 20 20">
                                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                </svg>
                              </div>
                            )}
                          </div>
                          
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm sm:text-lg font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                              {user.fullName}
                            </h3>
                            {currentUserId === user.userId && (
                              <span className="text-xs sm:text-sm text-primary font-medium">
                                You
                              </span>
                            )}
                          </div>
                        </Link>

                        {/* Action Buttons */}
                        <div className="flex items-center space-x-1 sm:space-x-2 flex-shrink-0">
                          {/* Follow/Unfollow Button */}
                          {currentUserId !== user.userId && (
                            <button
                              onClick={() => toggleFollow(user.userId)}
                              disabled={loadingActions[`follow_${user.userId}`]}                              className={`px-2 py-1.5 sm:px-4 sm:py-2 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed min-w-[60px] sm:min-w-[80px] border-0 ${
                                isCurrentlyFollowing
                                  ? "bg-background/50 text-textMuted hover:bg-red-500 hover:text-white"
                                  : "bg-primary text-white hover:bg-primaryHover shadow-lg shadow-primary/25"
                              }`}
                            >
                              {loadingActions[`follow_${user.userId}`] ? (
                                <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin mx-auto"></div>
                              ) : (
                                isCurrentlyFollowing ? "Unfollow" : "Follow"
                              )}
                            </button>
                          )}

                          {/* Remove Button (Own Profile Followers Only) */}
                          {isOwnProfile &&
                            activeTab === "followers" &&
                            currentUserId !== user.userId && (
                              <button
                                onClick={() =>
                                  removeFollower(user.userId, user.fullName)
                                }
                                disabled={loadingActions[`remove_${user.userId}`]}
                                className="px-2 py-1.5 sm:px-3 sm:py-2 rounded-lg text-xs sm:text-sm font-medium bg-background/50 text-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 transform hover:scale-105 disabled:scale-100 disabled:opacity-50 disabled:cursor-not-allowed border-0"
                              >
                                {loadingActions[`remove_${user.userId}`] ? (
                                  <div className="w-3 h-3 sm:w-4 sm:h-4 border-2 border-current border-t-transparent rounded-full animate-spin"></div>
                                ) : (
                                  <svg className="w-3 h-3 sm:w-4 sm:h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                  </svg>
                                )}
                              </button>
                            )}
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default FollowTabs;
