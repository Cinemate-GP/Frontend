import React from "react";
import Image from "next/image";
import Link from "next/link";
import { FiStar } from "react-icons/fi";
import { FaHeart, FaPlayCircle } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
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
}) => {  const getIcon = (type: string) => {
    const iconClass = "w-3.5 h-3.5";
    switch (type) {
      case "like":
        return <FaHeart className={`${iconClass} text-red-500 drop-shadow-sm`} />;
      case "Watched":
        return <FaPlayCircle className={`${iconClass} text-emerald-500 drop-shadow-sm`} />;
      case "review":
        return <MdOutlineRateReview className={`${iconClass} text-blue-500 drop-shadow-sm`} />;
      case "rate":
        return <FiStar className={`${iconClass} text-amber-500 drop-shadow-sm`} />;
      case "follow":
        return <RiUserFollowLine className={`${iconClass} text-violet-500 drop-shadow-sm`} />;
      default:
        return null;
    }
  };

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
        return type;
    }
  };  const renderActionContent = () => {
    switch (type) {
      case "rate":
        return (
          <div className="flex items-center gap-2 mt-3">            <div className="flex items-center gap-1 bg-gradient-to-r from-amber-500/10 to-orange-500/10 
                           backdrop-blur-sm rounded-lg px-3 py-1.5">
              <div className="flex gap-0.5">
                {[...Array(extractDigit(description))].map((_, index) => (
                  <FiStar key={index} className="w-3 h-3 text-amber-500 fill-current drop-shadow-sm" />
                ))}
              </div>
              <span className="ml-1.5 text-xs text-amber-600 dark:text-amber-400 font-semibold">
                {extractDigit(description)}/5
              </span>
            </div>
          </div>
        );
      case "review":
        return (
          <div className="mt-3">            <div className="bg-gradient-to-br from-secondaryBg/40 to-secondaryBg/20 backdrop-blur-sm 
                           rounded-lg p-3 shadow-sm">
              <div className="flex items-start gap-2">
                <MdOutlineRateReview className="w-3 h-3 text-blue-500 mt-0.5 flex-shrink-0" />
                <p className="text-textMuted text-xs leading-relaxed break-words line-clamp-3 italic">
                  &quot;{description}&quot;
                </p>
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };  return (    <article className="bg-gradient-to-br from-secondaryBg to-secondaryBg/80 
                       rounded-xl p-5 
                       hover:shadow-lg hover:shadow-black/5
                       transition-all duration-300 ease-out group 
                       backdrop-blur-sm relative overflow-hidden">
      
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.02] pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-primary/10" />
      </div>
      
      <div className="relative flex gap-4">        {/* Profile Section */}
        <Link
          href={`/${userId}`}
          className="flex-shrink-0 group/profile transition-all duration-200"
        >
          <div className="relative">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary/20 to-primary/5 
                           p-0.5 group-hover/profile:from-primary/30 group-hover/profile:to-primary/10 
                           transition-all duration-200">
              <Image
                src={profilePic || "/user-placeholder.jpg"}
                alt={`${fullName}'s profile`}
                width={48}
                height={48}
                className="w-full h-full rounded-full object-cover"
              />
            </div>            <div className="absolute -bottom-1 -right-1 bg-secondaryBg/90 
                           rounded-full p-1 shadow-lg backdrop-blur-sm">
              {getIcon(type)}
            </div>
          </div>
        </Link>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Header */}
          <div className="flex items-start justify-between gap-3 mb-1">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2 flex-wrap mb-1">                <Link
                  href={`/${userId}`}
                  className="font-semibold text-foreground hover:text-primary 
                           transition-colors text-sm group-hover:text-primary/90"
                >
                  {fullName}
                </Link>
                <span className="text-textMuted/70 text-xs font-medium">
                  {getActionText(type)}
                </span>                <Link
                  href={`/${type === "follow" ? "" : "movies/"}${id}`}
                  className="font-medium text-primary hover:text-primary/80 
                           transition-colors text-sm truncate max-w-[200px]"
                >
                  {actionTitle}
                </Link>
              </div>
              <div className="flex items-center gap-2 text-xs text-textMuted/60">
                <span>@{userId}</span>
                <span>•</span>
                <time>{convertToDateTime(time)}</time>
              </div>
              {renderActionContent()}
            </div>            {/* Poster */}
            <Link
              href={`/${type === "follow" ? "" : "movies/"}${id}`}
              className="flex-shrink-0 group/poster"
            ><div className="relative overflow-hidden rounded-lg 
                             shadow-md hover:shadow-lg transition-all duration-300 
                             bg-gradient-to-br from-secondaryBg/10 to-secondaryBg/5">
                <Image
                  src={
                    posterPath
                      ? type === "follow"
                        ? posterPath
                        : IMAGEPOSTER + posterPath
                      : "/image-placeholder.png"
                  }
                  alt={actionTitle}
                  width={64}
                  height={96}
                  className="w-16 h-24 object-cover group-hover/poster:scale-105 
                           transition-transform duration-500 ease-out"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent 
                               opacity-0 group-hover/poster:opacity-100 transition-opacity duration-300" />
              </div>
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
};

export default FeedCard;
