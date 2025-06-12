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
  backdropPath?: string;
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
  backdropPath,
  description,
}) => {
  const getActionVerb = (type: string) => {
    switch (type) {
      case "like": return "liked";
      case "Watched": return "watched";
      case "review": return "reviewed";
      case "rate": return "rated";
      case "follow": return "followed";
      default: return type;
    }
  };

  const getActionBadge = () => {
    let bgColor = "";
    let textColor = "";
    let label = "";
    let icon = null;
    
    switch (type) {
      case "like":
        bgColor = "bg-red-500";
        textColor = "text-white";
        label = "Liked";
        icon = <FaHeart className="w-3.5 h-3.5" />;
        break;
      case "Watched":
        bgColor = "bg-emerald-500";
        textColor = "text-white";
        label = "Watched";
        icon = <FaPlayCircle className="w-3.5 h-3.5" />;
        break;
      case "review":
        bgColor = "bg-blue-500";
        textColor = "text-white";
        label = "Review";
        icon = <MdOutlineRateReview className="w-3.5 h-3.5" />;
        break;
      case "rate":
        bgColor = "bg-amber-500";
        textColor = "text-white";
        label = "Rating";
        icon = <FiStar className="w-3.5 h-3.5" />;
        break;
      case "follow":
        bgColor = "bg-violet-500";
        textColor = "text-white";
        label = "Follow";
        icon = <RiUserFollowLine className="w-3.5 h-3.5" />;
        break;
    }
      return (
      <span className={`${bgColor} ${textColor} text-xs font-semibold px-2 py-1 rounded-full flex items-center gap-1.5`}>
        {icon}
        {label}
      </span>
    );
  };

  const renderRatingStars = (rating: number) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, i) => (          <FiStar 
            key={i} 
            className={`w-4 h-4 ${i < rating ? 'text-amber-400 fill-current' : 'text-textMuted/30'}`} 
          />
        ))}
        <span className="ml-1 text-sm font-medium">{rating}/5</span>
      </div>
    );
  };
  const renderActionContent = () => {
    switch (type) {
      case "rate":
        return (
          <div className="flex items-center mt-3">
            {renderRatingStars(extractDigit(description) || 0)}
          </div>
        );      case "review":
        return (
          <div className="mt-3">
            <div className="relative pl-4 pr-4 py-3 bg-mainBg rounded-lg">
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-blue-500 rounded-l-lg"></div>              <p className="text-sm leading-relaxed line-clamp-3 italic text-foreground/90">
                &quot;{description}&quot;
              </p>
            </div>
          </div>
        );
      default:
        return null;
    }
  };
  return (
    <motion.div
      className="bg-secondaryBg rounded-xl shadow-sm hover:shadow-md 
                transition duration-300 overflow-hidden"
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >      {/* Card Header with Profile & Action Badge */}      <div className="px-4 pt-4 pb-3 flex items-center justify-between border-b dark:border-[#2e2e2e] border-[#e0e0e0]">
        <div className="flex items-center gap-3">
          <Link href={`/${userId}`}>
            <div className="relative">              <Image
                src={profilePic || "/user-placeholder.jpg"}
                alt={fullName}
                width={40}
                height={40}
                className="rounded-full w-10 h-10 object-cover border-2 border-mainBg"
              />
            </div>
          </Link>
          
          <div>            <Link 
              href={`/${userId}`}
              className="font-semibold text-foreground hover:text-primary transition-colors text-sm block"
            >
              {fullName}
            </Link>
            <div className="text-textMuted text-xs">
              {convertToDateTime(time)}
            </div>
          </div>
        </div>
        
        {getActionBadge()}
      </div>
      
      {/* Content Area */}      <div className="px-4 py-3">        {/* Action Text and Movie Link */}
        <div className="flex items-center gap-1.5 flex-wrap">
          <span className="text-sm text-textMuted">
            {getActionVerb(type)}
          </span>
          <Link
            href={`/${type === "follow" ? "" : "movies/"}${id}`}
            className="text-sm font-medium text-primary hover:underline"
          >
            {actionTitle}
          </Link>
        </div>
        
        {/* Action-Specific Content (ratings, review, etc) */}
        {renderActionContent()}
      </div>
      
      {/* Movie Poster Area for non-follow actions */}      {type !== "follow" && (
        <Link
          href={`/movies/${id}`}
          className="block relative w-full h-48 mt-2 bg-mainBg overflow-hidden group"
        >          <Image
            src={backdropPath ? IMAGEPOSTER + backdropPath : posterPath ? IMAGEPOSTER + posterPath : "/image-placeholder.png"}
            alt={actionTitle}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          /><div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent flex items-end">
            <div className="p-4 w-full">
              <div className="flex items-center justify-between">
                <h3 className="text-white text-lg font-semibold line-clamp-1 flex-1">{actionTitle}</h3>
                {/* Trailer play button */}
                <div className="bg-black/40 hover:bg-black/60 transition p-1.5 rounded-full ml-3">
                  <FaPlayCircle className="w-5 h-5 text-white" />
                </div>
              </div>
            </div>
          </div>
        </Link>
      )}
        {/* Follow action special layout */}
      {type === "follow" && (
        <div className="px-4 pb-4 mt-1">
          <Link 
            href={`/${id}`}
            className="flex items-center gap-3 hover:bg-hoverBg/30 p-2 -m-2 rounded-lg transition-colors"
          >
            <Image
              src={posterPath || "/user-placeholder.jpg"}
              alt={actionTitle}
              width={50}
              height={50}
              className="rounded-full w-12 h-12 object-cover border-2 border-mainBg"
            />
            <div>
              <span className="font-medium text-foreground hover:text-primary transition-colors text-sm block">
                {actionTitle}
              </span>
              <span className="text-xs text-textMuted">@{id}</span>
            </div>
          </Link>
        </div>
      )}
    </motion.div>
  );
};

export default FeedCard;
