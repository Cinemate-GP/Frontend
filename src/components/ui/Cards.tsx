import Image from "next/image";
import { FaStar, FaClock } from "react-icons/fa";// Assuming you have this util
import { formatTimestamp } from "@/lib/utils"; // Your date formatter
import { IMAGEPOSTER } from "@/constants";

import { FaHeart, FaPlus, FaCheck } from "react-icons/fa";
import { ReactElement } from "react";

export const getIcon = (type: string): ReactElement => {
  switch (type) {
    case "liked":
      return <FaHeart className="text-red-500" />;
    case "reviewed":
      return <FaStar className="text-yellow-400" />;
    case "watchList":
      return <FaPlus className="text-blue-400" />;
    case "watched":
      return <FaCheck className="text-green-500" />;
    default:
      return <FaPlus className="text-gray-400" />;
  }
};
// Base URL for images

interface Activity {
  tmdbId: number;
  title: string;
  poster_path: string;
  type: string;
  createdAt: string;
  reviewMessage?: string;
  rating?: number;
}

interface Props {
  activity: Activity;
}

export const RecentActivityCard = ({ activity }: Props) => {
  return (
    <div className="flex items-center gap-4 bg-zinc-900 rounded-2xl border border-zinc-800 shadow-sm p-4 hover:bg-zinc-800 transition-all">
      <Image
        src={IMAGEPOSTER + activity.poster_path}
        alt={activity.title}
        width={72}
        height={108}
        className="w-20 h-28 object-cover rounded-lg shadow-md"
      />

      <div className="flex-1 flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="text-base md:text-lg font-semibold text-white truncate">
            {activity.title}
          </h3>
          <p>{getIcon(activity.type)} <span>{`Added to ${activity.type}`}</span></p>
          <p className="text-xs text-gray-500 flex items-center gap-1">
            <FaClock className="text-gray-400" />
            {formatTimestamp(activity.createdAt)}
          </p>
        </div>

        {activity.reviewMessage && (
          <div className="flex items-center gap-2 text-sm text-gray-300 mt-1">
            <span className="line-clamp-2">{activity.reviewMessage}</span>
          </div>
        )}

        {activity.type === "reviewed" && activity.rating != null && (
          <div className="flex items-center mt-2 gap-1">
            {[...Array(5)].map((_, i) => (
              <FaStar
                key={i}
                size={14}
                className={i < activity.rating! ? "text-red-500" : "text-zinc-600"}
              />
            ))}
          </div>
        )}
        {activity.type === 'reviewd' && <p>{activity.reviewMessage}</p>}
      </div>
    </div>
  );
};


