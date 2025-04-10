/* eslint-disable @next/next/no-img-element */
"use client";
import SectionTitle from "@/components/SectionTitle";
import { IMAGEPOSTER } from "@/constants";
import { formatTimestamp, truncateText } from "@/lib/utils";
import { RootState } from "@/redux/store";
import { useState } from "react";
import {
  FaHeart,
  FaPlayCircle,
  FaBookmark,
  FaStar,
  FaClock,
} from "react-icons/fa";
import { MdRateReview } from "react-icons/md";
import { useSelector } from "react-redux";

const getIcon = (type: string) => {
  switch (type) {
    case "liked":
      return <FaHeart className="text-red-500" />;
    case "watchlist":
      return <FaBookmark className="text-yellow-400" />;
    case "watched":
      return <FaPlayCircle className="text-green-500" />;
    case "reviewed":
      return <MdRateReview className="text-blue-400" />;
    default:
      return null;
  }
};

export default function RecentActivitySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const { recentActivities } = useSelector(
    (state: RootState) => state.recentActivities
  );
  return (
    <div className="mt-5">
      <SectionTitle title="Recent Activity" />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-0 sm:p-6 rounded-lg">
        {recentActivities?.length === 0 && <p>No activities yet</p>}

        {recentActivities?.map((activity) => (
          <div
            key={activity.tmdbId}
            className="flex bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 shadow-md"
          >
            <img
              src={IMAGEPOSTER + activity.poster_path}
              alt={activity.movieTitle}
              width={250}
              height={190}
              className="w-40 md:w-56 lg:w-60 h-40 md:h-60 object-cover"
              loading="lazy"
            />

            <div className="p-4 flex-1 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white">
                {activity.movieTitle}
              </h3>

              <div className="flex gap-6">
                <div className="flex items-center gap-2 text-sm text-gray-300 mb-2">
                  {getIcon(activity.type)}
                  <span>{activity.title}</span>
                </div>

                {activity.type === "reviewed" && activity.rating != null && (
                  <div className="flex items-center space-x-1 mb-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < activity.rating!
                            ? "text-red-500"
                            : "text-zinc-600"
                        }
                      />
                    ))}
                  </div>
                )}
              </div>

              {activity.reviewMessage && (
                <p className="text-gray-400 text-sm mt-1">
                  {truncateText(activity.reviewMessage!, isExpanded, 80)}
                  <br />
                  {activity.reviewMessage!.length > 80 && (
                    <button
                      className="text-white text-sm"
                      onClick={() => setIsExpanded(!isExpanded)}
                    >
                      {isExpanded ? "Read Less" : "Read More"}
                    </button>
                  )}
                </p>
              )}

              <div className="flex items-center gap-2">
                <FaClock />
                <p className="text-xs text-gray-500">
                  {formatTimestamp(activity.createdAt)}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
