import { FaHeart, FaRegEye, FaRegStar } from "react-icons/fa6";
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
    },
    {
      icon: <FaRegEye color={watched ? "red" : "white"} className={`group-hover:text-red-500 transition-all duration-200 animate-heart`} />,

      onClick: onWatched,
    },
    {
      icon: <FiPlus />,
      onClick: onWatchlist,
    },
    {
      icon: <FaRegStar color={rated ? "red": "white"} className={`group-hover:text-red-500 transition-all duration-200 animate-heart`} />,
      onClick: onRate,
    },
  ];

  return (
    <div className="flex items-center gap-6">
      {buttons.map((btn, index) => (
        <button
          key={index}
          className="text-xl group transition-all duration-200 border border-gray-600 rounded p-2 px-3"
          onClick={btn.onClick}
        >
          {btn.icon}
        </button>
      ))}
    </div>
  );
};
