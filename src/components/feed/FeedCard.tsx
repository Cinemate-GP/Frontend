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
}) => {
  const getIcon = (type: string) => {
    const iconClass = "w-4 h-4";
    switch (type) {
      case "like":
        return <FaHeart className={`${iconClass} text-red-500`} />;
      case "Watched":
        return <FaPlayCircle className={`${iconClass} text-green-500`} />;
      case "review":
        return <MdOutlineRateReview className={`${iconClass} text-blue-500`} />;
      case "rate":
        return <FiStar className={`${iconClass} text-yellow-500`} />;
      case "follow":
        return <RiUserFollowLine className={`${iconClass} text-purple-500`} />;
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
  };

  const renderActionContent = () => {
    switch (type) {
      case "rate":
        return (
          <div className="flex items-center gap-2 mt-3">
            <span className="text-sm text-textMuted">Rating:</span>
            <div className="flex gap-1 bg-black/50 rounded-full px-3 py-1">
              {[...Array(extractDigit(description))].map((_, index) => (
                <FiStar key={index} className="w-3 h-3 text-yellow-500 fill-current" />
              ))}
            </div>
          </div>
        );
      case "review":
        return (          <div className="mt-3">
            <div className="bg-secondaryBg border border-border rounded-lg p-3">
              <p className="text-foreground text-sm leading-relaxed break-words">
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
    <article className="bg-secondaryBg border border-border rounded-xl p-6 
                       hover:border-primary/20 transition-all duration-200 
                       shadow-sm hover:shadow-md">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        {/* Profile Section */}
        <Link
          href={`/user/${userId}`}
          className="flex items-center gap-3 group hover:opacity-80 transition-opacity"
        >
          <div className="relative">
            <Image
              src={profilePic || "/user-placeholder.jpg"}
              alt={`${fullName}'s profile`}
              width={48}
              height={48}
              className="w-12 h-12 rounded-full object-cover border-2 border-border"
            />
            <div className="absolute -bottom-1 -right-1 bg-secondaryBg border border-border rounded-full p-1">
              {getIcon(type)}
            </div>
          </div>
          <div className="flex flex-col">
            <h3 className="font-semibold text-foreground group-hover:text-primary transition-colors">
              {fullName}
            </h3>
            <p className="text-xs text-textMuted">@{userId}</p>
          </div>
        </Link>

        {/* Timestamp */}
        <time className="text-xs text-textMuted bg-mainBg px-2 py-1 rounded-md">
          {convertToDateTime(time)}
        </time>
      </div>

      {/* Action Content */}
      <div className="bg-mainBg/50 rounded-lg p-4 border border-border/50">
        <div className="flex justify-between items-start gap-4">
          {/* Left Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-2">
              {getIcon(type)}
              <p className="text-foreground">
                <span className="text-textMuted text-sm">
                  {getActionText(type)}
                </span>
                <span className="font-medium text-primary ml-2">
                  {actionTitle}
                </span>
              </p>
            </div>
            
            {renderActionContent()}
          </div>

          {/* Right Content - Image */}
          <Link
            href={`/${type === "follow" ? "user" : "movies"}/${id}`}
            className="flex-shrink-0 group"
          >
            <div className="relative overflow-hidden rounded-lg border border-border">
              <Image
                src={
                  posterPath
                    ? type === "follow"
                      ? posterPath
                      : IMAGEPOSTER + posterPath
                    : "/image-placeholder.png"
                }
                alt={actionTitle}
                width={80}
                height={120}
                className="w-20 h-30 object-cover group-hover:scale-105 transition-transform duration-200"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-200" />
            </div>
          </Link>        </div>
      </div>
    </article>
  );
};

export default FeedCard;
