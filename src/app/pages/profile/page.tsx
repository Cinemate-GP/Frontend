/* eslint-disable @next/next/no-img-element */
"use client";
import SectionTitle from "@/components/SectionTitle";
import { ActivityCardSkeleton } from "@/components/skeletons";
import { IMAGEPOSTER } from "@/constants";
import { formatTimestamp, truncateText } from "@/lib/utils";
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
          <FaStar className="text-yellow-400" />
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
          <FaBookmark className="text-yellow-400" />
          <span>Added to Watchlist</span>
        </div>
      );
    case "Watched":
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <FaPlayCircle className="text-green-500" />
          <span>Watched Movie</span>
        </div>
      );
    case "review":
      return (
        <div className="flex items-center gap-2 text-sm text-gray-300">
          <MdRateReview className="text-blue-400" />
          <span>Reviewd</span>
        </div>
      );
    default:
      return null;
  }
};

interface Activity {
  userId: number;
  tmdbId: number;
  type: string;
  posterPath: number;
  name: string;
  description: string;
  createdOn: string;
  stars: number;
}

export default function RecentActivitySection() {
  const [isExpanded, setIsExpanded] = useState(false);
  const [loading, setLoading] = useState(true);
  const [recenActivities, setRecentActivities] = useState<Activity[] | null>(
    null
  );

  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await fetch("/api/Profile/RecentActivity", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${document.cookie.split("=")[1]}`,
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
  }, []);
  return (
    <div className="mt-5">
      <SectionTitle title="Recent Activity" />
      {loading && <ActivityCardSkeleton />}
      {recenActivities?.length === 0 && <p>No activities yet</p>}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 p-0 sm:p-6 rounded-lg">
        {recenActivities?.map((item) => (
          <Link
            href={"/pages/movies/" + item.tmdbId}
            key={item.createdOn}
            className="flex bg-zinc-900 rounded-xl overflow-hidden border border-zinc-700 shadow-md"
          >
            <img
              src={IMAGEPOSTER + item.posterPath}
              alt={item.name}
              width={250}
              height={190}
              className="max-w-[90px] max-h-[120px] sm:max-w-[150px] lg:max-w-[200px] sm:max-h-[250px] object-cover"
              loading="lazy"
            />

            <div className="p-4 flex-1 flex flex-col gap-3">
              <h3 className="text-sm sm:text-lg font-bold text-white">
                {item.name}
              </h3>

              <div className="flex flex-col gap-6">
                {/* title & icons */}
                {getIcon(item.type)}

                {/* review message if exist */}
                {item.description && item.type === "review" && (
                  <p className="text-gray-400 text-sm">
                    {truncateText(item.description!, isExpanded, 80)}
                    <br />
                    {item.type!.length > 80 && (
                      <button
                        className="text-white text-sm"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "Read Less" : "Read More"}
                      </button>
                    )}
                  </p>
                )}
                {/* rating if exist */}
                {item.stars > 0 && (
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, i) => (
                      <FaStar
                        key={i}
                        size={14}
                        className={
                          i < item.stars! ? "text-red-500" : "text-zinc-600"
                        }
                      />
                    ))}
                  </div>
                )}

                {/* dated created at */}
                <div className="flex items-center gap-2">
                  <FaClock />
                  <p className="text-xs text-gray-500">
                    {formatTimestamp(item.createdOn)}
                  </p>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
