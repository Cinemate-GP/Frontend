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
      {recentActivities?.length === 0 && <p>No activities yet</p>}
      <div className="grid grid-cols-1 gap-4 p-0 sm:p-6 rounded-lg">
        {recentActivities?.map((item) => (
          <div
            key={item.tmdbId}
            className="flex bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 shadow-md"
          >
            <img
              src={IMAGEPOSTER + item.poster_path}
              alt={item.movieTitle}
              width={250}
              height={190}
              className="w-40 md:w-56 lg:w-60 h-40 md:h-60 object-cover"
              loading="lazy"
            />

            <div className="p-4 flex-1 flex flex-col gap-3">
              <h3 className="text-lg font-bold text-white">
                {item.movieTitle}
              </h3>

              {item.activities.map((activity) => (
                <div key={activity.title}>
                  <div className="flex gap-6 items-center flex-wrap">
                    {/* title & icons */}
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      {getIcon(activity.type)}
                      <span>{activity.title}</span>
                    </div>
                    {/* review message if exist */}
                    {activity.review && (
                      <p className="text-gray-400 text-sm">
                        {truncateText(activity.review!, isExpanded, 80)}
                        <br />
                        {activity.review!.length > 80 && (
                          <button
                            className="text-white text-sm"
                            onClick={() => setIsExpanded(!isExpanded)}
                          >
                            {isExpanded ? "Read Less" : "Read More"}
                          </button>
                        )}
                      </p>
                    )}<br/>
                    {/* rating if exist */}
                    {activity.rating && (
                      <div className="flex items-center space-x-1">
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
                    {/* dated created at */}
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
        ))}
      </div>
    </div>
  );
}
