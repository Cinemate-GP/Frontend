import { FaHeart, FaRegEye, FaStar } from "react-icons/fa6";
import { FiHeart, FiPlus } from "react-icons/fi";

interface MovieActionsProps {
  liked: boolean;
  watched: boolean;
  rated: boolean;
  onLikeToggle: () => void;
  onWatched: () => void;
  onWatchlist: () => void;
  onRate: () => void;
}

export const MovieActions = ({
  liked,
  watched,
  rated,
  onWatched,
  onLikeToggle,
  onWatchlist,
  onRate,
}: MovieActionsProps) => {
  const buttons = [
    {
      icon: liked ? (
        <FaHeart color="red" className="animate-heart" />
      ) : (
        <FiHeart className="group-hover:text-red-500 transition-all duration-200" />
      ),
      onClick: onLikeToggle,
      label: "Like",
    },
    {
      icon: (
        <FaRegEye
          color={watched ? "red" : "white"}
          className="group-hover:!text-red-500 transition-all duration-200 animate-heart"
        />
      ),
      onClick: onWatched,
      label: "Watched",
    },
    {
      icon: (
        <FiPlus className="group-hover:text-red-500 transition-all duration-200" />
      ),
      onClick: onWatchlist,
      label: "Watchlist",
    },
    {
      icon: (
        <>
          {rated ? (
            <FaStar color="red" className="animate-heart" />
          ) : (
            <FiHeart className="group-hover:text-red-500 transition-all duration-200" />
          )}
        </>
      ),
      onClick: onRate,
      label: "Rate",
    },
  ];

  return (
    <div className="flex items-center gap-6 mt-4">
      {buttons.map((btn, index) => (
        <div key={index} className="relative group flex flex-col items-center">
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
  );
};
