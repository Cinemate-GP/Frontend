/* eslint-disable @next/next/no-img-element */
"use client";
import SectionTitle from "@/components/SectionTitle";
import { ActivityCardSkeleton } from "@/components/skeletons";
import { IMAGEPOSTER } from "@/constants";
import { authFetch } from "@/lib/api";
import {
  formatTimestamp,
  getCookie,
  getUserId,
  truncateText,
} from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import {
  FaHeart,
  FaPlayCircle,
  FaBookmark,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";

const getIcon = (type: string) => {
  switch (type) {
    case "rate":
      return (
        <div className="flex items-center gap-2 text-sm text-textMuted">
          <FaStar className="text-primary" />
          <span>Rated Movie</span>
        </div>
      );
    case "like":
      return (
        <div className="flex items-center gap-2 text-sm text-textMuted">
          <FaHeart className="text-primary" />
          <span>Added To Favorites</span>
        </div>
      );
    case "WatchList":
      return (
        <div className="flex items-center gap-2 text-sm text-textMuted">
          <FaBookmark className="text-primary" />
          <span>Added to Watchlist</span>
        </div>
      );
    case "Watched":
      return (
        <div className="flex items-center gap-2 text-sm text-textMuted">
          <FaPlayCircle className="text-primary" />
          <span>Watched Movie</span>
        </div>
      );
    case "review":
      return (
        <div className="flex items-center gap-2 text-sm text-textMuted">
          <MdRateReview className="text-primary" />
          <span>Reviewed</span>
        </div>
      );
    default:
      return null;
  }
};

interface Activity {
  tmdbId: number;
  type: string;
  posterPath: number;
  name: string;
  description: string;
  createdOn: string;
  stars: number;
}

const ITEMS_PER_PAGE = 6;

export default function RecentActivitySection({ userId }: { userId?: string }) {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = getCookie("token");
  const validUserId = userId || getUserId();
  const [recenActivities, setRecentActivities] = useState<Activity[] | null>(
    null
  );

  const handleLoadMore = () => {
    setVisibleCount((prev) => prev + ITEMS_PER_PAGE);
  };

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await authFetch(
          `/api/Profile/RecentActivity/${validUserId}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (!res.ok) throw new Error("Failed to fetch recent activities");
        const data = await res.json();
        setRecentActivities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token, userId, validUserId]);

  return (
    <div className="mt-5">
      <SectionTitle title="Recent Activity" />
      {loading && <ActivityCardSkeleton />}
      {recenActivities?.length === 0 && (
        <p className="text-center text-gray-500 py-8">No activities yet</p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 px-0 rounded-lg">
        {recenActivities?.slice(0, visibleCount).map((item) => (
          <Link
            href={"/movies/" + item.tmdbId}
            key={item.createdOn}
            className="group flex bg-secondaryBg rounded-xl max-h-[200px] overflow-hidden border border-border shadow-lg hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative w-[150px] sm:max-w-[200px] md:w-[280px] overflow-hidden">
              <img
                src={IMAGEPOSTER + item.posterPath}
                alt={item.name}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-foreground mb-2 group-hover:text-primary transition-colors duration-300">
                  {item.name}
                </h3>

                {/* Activity type with icon */}
                {getIcon(item.type)}
              </div>
              {/* Rating if exists */}
              {item.stars > 0 && (
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, i) => (
                    <FaStar
                      key={i}
                      size={14}
                      className={
                        i < item.stars! ? "text-primary" : "text-zinc-700"
                      }
                    />
                  ))}
                </div>
              )}

              <div className="mt-3 space-y-3">
                {/* Review message if exists */}
                {item.description && item.type === "review" && (
                  <div className="bg-background shadow-md rounded-lg p-3 border-l-2 border-primary">
                    <p className="text-gray-500 text-sm italic">
                      {truncateText(item.description!, isExpanded, 80)}
                      {item.description.length > 80 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsExpanded(!isExpanded);
                          }}
                          className="text-primary text-sm font-medium ml-1"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>
                  </div>
                )}

                {/* Date created at */}
                <div className="flex items-center gap-2 text-xs text-gray-400">
                  <FaClock className="text-gray-500" />
                  <p>{formatTimestamp(item.createdOn)}</p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Load more button with improved styling */}
      {(recenActivities?.length ?? 0) > visibleCount && (
        <button
          onClick={handleLoadMore}
          className="my-6 px-6 py-2.5 bg-gradient-to-r bg-primary text-white rounded-full w-fit mx-auto block font-medium  transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30 "
        >
          Load More
        </button>
      )}
    </div>
  );
}
