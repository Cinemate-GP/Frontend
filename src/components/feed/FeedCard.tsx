import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { motion } from "framer-motion";
import { IMAGEPOSTER } from "@/constants";
import { convertToDateTime, extractDigit } from "@/lib/utils";

interface ActionCardProps {
  id: number;
  userId: string;
  type: string;
  profilePic: string;
  fullName: string;
  time: string;
  actionTitle: string;
  posterPath: string;
  description: string;
}

const FeedCard: React.FC<ActionCardProps> = ({
  userId,
  id,
  profilePic,
  fullName,
  time,
  type,
  actionTitle,
  posterPath,
  description,
}) => {  
  const getActionText = (type: string) => {
    switch (type) {
      case "like":
        return "liked";
      case "Watched":
        return "watched";
      case "review":
        return "reviewed";
      case "rate":
        return "rated";
      case "follow":
        return "followed";
      default:
        return type;    }
  };

  const renderActionContent = () => {
    
    switch (type) {
      case "rate":
        return (
          <div className="mt-3">
            <div className="flex items-center gap-3 p-3 bg-mainBg/50 border border-border/50 rounded-lg">
              <div className="flex items-center gap-1">
                {[...Array(extractDigit(description))].map((_, index) => (
                  <FiStar key={index} className="w-4 h-4 text-amber-500 fill-current" />
                ))}
              </div>
              <span className="text-sm font-medium text-foreground">
                Rated {extractDigit(description)}/5
              </span>
            </div>
          </div>
        );
      case "review":
        return (
          <div className="mt-3">
            <div className="p-4 bg-mainBg/50 border border-border/50 rounded-lg">
              <div className="flex items-start gap-3">
                <MdOutlineRateReview className="w-4 h-4 text-blue-500 mt-0.5 flex-shrink-0" />
                <div className="flex-1">
                  <div className="text-xs text-textMuted/70 mb-1 font-medium">Review</div>
                  <p className="text-textMuted text-sm leading-relaxed line-clamp-3 italic">
                    &quot;{description}&quot;
                  </p>
                </div>
              </div>
            </div>
          </div>
        );
      case "like":
        return (
          <div className="mt-3">
            <div className="flex items-center gap-2 p-2 bg-red-500/10 border border-red-500/20 rounded-lg">
              <FaHeart className="w-3 h-3 text-red-500" />
              <span className="text-xs font-medium text-red-600 dark:text-red-400">Liked this movie</span>
            </div>
          </div>
        );
      case "Watched":
        return (
          <div className="mt-3">
            <div className="flex items-center gap-2 p-2 bg-emerald-500/10 border border-emerald-500/20 rounded-lg">
              <FaPlayCircle className="w-3 h-3 text-emerald-500" />
              <span className="text-xs font-medium text-emerald-600 dark:text-emerald-400">Watched this movie</span>
            </div>
          </div>
        );
      case "follow":
        return (
          <div className="mt-3">
            <div className="flex items-center gap-2 p-2 bg-violet-500/10 border border-violet-500/20 rounded-lg">
              <RiUserFollowLine className="w-3 h-3 text-violet-500" />
              <span className="text-xs font-medium text-violet-600 dark:text-violet-400">Started following</span>
            </div>
          </div>
        );
      default:
        return null;
    }
  };return (
    <motion.article 
      className="bg-secondaryBg border border-border rounded-lg p-6 hover:border-border/80 
                 transition-all duration-200 group relative"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      whileHover={{ y: -1 }}
    >
      <div className="flex gap-4">
        {/* Profile Section - GitHub style */}
        <Link
          href={`/${userId}`}
          className="flex-shrink-0 group/profile"
        >
          <motion.div 
            className="w-12 h-12 rounded-full overflow-hidden border-2 border-border/50 
                       hover:border-primary/50 transition-colors duration-200"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.2 }}
          >
            <Image
              src={profilePic || "/user-placeholder.jpg"}
              alt={`${fullName}'s profile`}
              width={48}
              height={48}
              className="w-full h-full object-cover"
            />
          </motion.div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header - GitHub style */}
          <div className="flex items-center gap-2 mb-3">
            <Link
              href={`/${userId}`}
              className="font-semibold text-foreground hover:text-primary 
                       transition-colors text-sm"
            >
              {fullName}
            </Link>
            <span className="text-textMuted/70 text-sm">
              {getActionText(type)}
            </span>
            <Link
              href={`/${type === "follow" ? "" : "movies/"}${id}`}
              className="font-medium text-primary hover:underline text-sm truncate max-w-[200px]"
            >
              {actionTitle}
            </Link>
            <span className="text-textMuted/60 text-xs ml-auto">
              {convertToDateTime(time)}
            </span>
          </div>

          {/* Action Content */}
          <div className="flex gap-4">
            <div className="flex-1">
              {renderActionContent()}
            </div>

            {/* Movie Poster - Improved styling */}
            <Link
              href={`/${type === "follow" ? "" : "movies/"}${id}`}
              className="flex-shrink-0 group/poster"
            >
              <motion.div 
                className="relative overflow-hidden rounded-md border border-border/50 
                           hover:border-border/80 transition-colors duration-200"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.2 }}
              >
                <Image
                  src={
                    posterPath
                      ? type === "follow"
                        ? posterPath
                        : IMAGEPOSTER + posterPath
                      : "/image-placeholder.png"
                  }
                  alt={actionTitle}
                  width={60}
                  height={90}
                  className="w-15 h-22 object-cover"
                />
                
                {/* Simple overlay for movies */}
                {type !== "follow" && (
                  <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/poster:opacity-100 
                                 transition-opacity duration-200 flex items-center justify-center">
                    <FaPlayCircle className="w-4 h-4 text-white" />
                  </div>
                )}
              </motion.div>
            </Link>
          </div>
        </div>
      </div>
    </motion.article>
  );
};

export default FeedCard;
