import { useMovieInfo } from "@/hooks/useMovieActions";
import { authFetch } from "@/lib/api";
import { getCookie, getUserId } from "@/lib/utils";
import { useState } from "react";
import { FaHeart, FaRegEye, FaRegStar, FaStar } from "react-icons/fa6";
import { FiHeart } from "react-icons/fi";
import { MdOutlineRateReview } from "react-icons/md";
import { BsFillEyeFill } from "react-icons/bs";
import { BsBookmarkPlus } from "react-icons/bs";
import { BsBookmarkCheckFill } from "react-icons/bs";

interface MovieActionsProps {
  tmdbId: number;
  isLiked: boolean;
  isWatched: boolean;
  isInWatchList: boolean;
  stars: number;
  onReview: () => void;
}

export const MovieActions = ({
  tmdbId,
  isLiked,
  isWatched,
  isInWatchList,
  stars,
  onReview,
}: MovieActionsProps) => {
  const {
    liked,
    watched,
    watchlist,
    toggleLike,
    toggleWatched,
    toggleWatchlist,
  } = useMovieInfo({ tmdbId, isLiked, isWatched, isInWatchList });
  const token = getCookie('token');
  const buttons = [
    {
      icon: liked ? (
        <FaHeart className="animate-heart text-primary" />
      ) : (
        <FiHeart className="group-hover:text-primary transition-all duration-200 animate-heart" />
      ),
      onClick: toggleLike,
      label: "Like",
    },
    {
      icon: watched ? (
        <BsFillEyeFill size={22} className="text-primary animate-heart" />
      ) : (
        <FaRegEye size={22} className="group-hover:!text-primary transition-all duration-200 animate-heart" />
      ),
      onClick: toggleWatched,
      label: "Watched",
    },
    {
      icon: watchlist ? (
        <BsBookmarkCheckFill className={`text-primary animate-heart`}/>
      ) : (
        <BsBookmarkPlus className="group-hover:text-primary transition-all duration-200 animate-heart" />
      ),
      onClick: toggleWatchlist,
      label: "Watchlist",
    },
    {
      icon: (
        <>
          <MdOutlineRateReview className="group-hover:text-primary transition-all duration-200 animate-heart" />
        </>
      ),
      onClick: onReview,
      label: "Rate",
    },
  ];
  const [rating, setRating] = useState<number | null>(stars);

  const handleRating = async (i: number) => {
    try {
      const res = await authFetch("/api/UserRateMovie/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdbId: tmdbId,
          userId: getUserId(),
          stars: i,
        }),
      });
      if (!res.ok) throw new Error("Failed to add rating");
    } catch (error) {
      console.log(error);
    }
    setRating(i);
  };

  return (
    <>
      <div className="flex items-center gap-6 mt-4 text-white">
        {buttons.map((btn, index) => (
          <div
            key={index}
            className="relative group flex flex-col items-center"
          >
            {/* Tooltip */}
            <div className="absolute -top-8 mb-3 opacity-0 group-hover:opacity-100 transition-all duration-200 z-10 flex flex-col items-center">
              <div className="text-xs border text-white px-2 py-1 rounded bg-black">
                {btn.label}
              </div>
              {/* Downward arrow */}
              <div className="w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white-500"></div>
            </div>

            {/* Button */}
            <button
              className="text-xl transition-all duration-200 border border-gray-600 rounded p-2 px-3"
              onClick={btn.onClick}
            >
              {btn.icon}
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2 justify-center mt-3">
        {Array.from({ length: rating! }, (_, i) => (
          <button key={i} onClick={() => handleRating(i + 1)}>
            <FaStar className="text-2xl text-primary" />
          </button>
        ))}
        {Array.from({ length: 5 - rating! }, (_, i) => (
          <button key={i} onClick={() => handleRating(rating! + i + 1)}>
            <FaRegStar className="text-2xl text-primary" />
          </button>
        ))}
      </div>
    </>
  );
};
