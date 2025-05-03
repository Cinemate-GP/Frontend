/* eslint-disable @next/next/no-img-element */
"use client";
import SectionTitle from "@/components/SectionTitle";
import { ActivityCardSkeleton } from "@/components/skeletons";
import { IMAGEPOSTER } from "@/constants";
import { authFetch } from "@/lib/api";
import { formatTimestamp, getCookie, getUserId, truncateText } from "@/lib/utils";
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
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaStar className="text-red-500" />
          <span>Rated Movie</span>
        </div>
      );
    case "like":
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaHeart className="text-red-500" />
          <span>Added To Favorites</span>
        </div>
      );
    case "WatchList":
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaBookmark className="text-red-500" />
          <span>Added to Watchlist</span>
        </div>
      );
    case "Watched":
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaPlayCircle className="text-red-500" />
          <span>Watched Movie</span>
        </div>
      );
    case "review":
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <MdRateReview className="text-red-500" />
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

export default function RecentActivitySection() {
  const [visibleCount, setVisibleCount] = useState(ITEMS_PER_PAGE);
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const token = getCookie("token");
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
        const res = await authFetch(`/api/Profile/RecentActivity/${getUserId()}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch recent activities");
        const data = await res.json();
        setRecentActivities(data);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);
  
  return (
    <div className="mt-5">
      <SectionTitle title="Recent Activity" />
      {loading && <ActivityCardSkeleton />}
      {recenActivities?.length === 0 && (
        <p className="text-center text-gray-400 py-8">No activities yet</p>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 p-0 sm:p-6 rounded-lg">
        {recenActivities?.slice(0, visibleCount).map((item) => (
          <Link
            href={"/movies/" + item.tmdbId}
            key={item.createdOn}
            className="group flex bg-zinc-900 rounded-xl overflow-hidden border border-zinc-800 shadow-lg hover:shadow-red-900/20 transition-all duration-300 hover:-translate-y-1"
          >
            <div className="relative overflow-hidden min-w-[90px] sm:min-w-[120px]">
              <img
                src={IMAGEPOSTER + item.posterPath}
                alt={item.name}
                width={250}
                height={190}
                className="w-full h-full min-h-[130px] sm:min-h-[160px] object-cover transition-transform duration-500 group-hover:scale-110"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>

            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <h3 className="text-base sm:text-lg font-bold text-white mb-2 group-hover:text-red-400 transition-colors duration-300">
                  {item.name}
                </h3>

                {/* Activity type with icon */}
                {getIcon(item.type)}
              </div>

              <div className="mt-3 space-y-3">
                {/* Review message if exists */}
                {item.description && item.type === "review" && (
                  <div className="bg-zinc-950/50 rounded-lg p-3 border-l-2 border-red-500">
                    <p className="text-gray-300 text-sm italic">
                      {truncateText(item.description!, isExpanded, 80)}
                      {item.description.length > 80 && (
                        <button
                          onClick={(e) => {
                            e.preventDefault();
                            setIsExpanded(!isExpanded);
                          }}
                          className="text-red-400 hover:text-red-300 text-sm font-medium ml-1"
                        >
                          {isExpanded ? "Read Less" : "Read More"}
                        </button>
                      )}
                    </p>
                  </div>
                )}

                {/* Rating if exists */}
                {item.stars > 0 && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < item.stars! ? "text-red-500" : "text-zinc-700"
                        }
                      />
                    ))}
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
          className="my-6 px-6 py-2.5 bg-gradient-to-r from-red-600 to-red-800 text-white rounded-full w-fit mx-auto block font-medium hover:from-red-700 hover:to-red-900 transition-all duration-300 hover:shadow-lg hover:shadow-red-900/30 focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-zinc-900"
        >
          Load More
        </button>
      )}
    </div>
  );
}
