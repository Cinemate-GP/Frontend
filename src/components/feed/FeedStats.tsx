import React from "react";
import { HiEye, HiHeart, HiStar, HiUsers, HiChatBubbleLeft } from "react-icons/hi2";

interface FeedItem {
  type: string;
  id: number;
  userId: string;
  profilePic: string;
  fullName: string;
  time: string;
  actionTitle: string;
  posterPath: string;
  description: string;
}

interface FeedStatsProps {
  feeds?: FeedItem[];
}

const FeedStats: React.FC<FeedStatsProps> = ({ feeds = [] }) => {
  const getStatsData = () => {
    const stats = {
      total: feeds.length,
      likes: feeds.filter(feed => feed.type === "like").length,
      watched: feeds.filter(feed => feed.type === "Watched").length,
      reviews: feeds.filter(feed => feed.type === "review").length,
      ratings: feeds.filter(feed => feed.type === "rate").length,
      follows: feeds.filter(feed => feed.type === "follow").length,
    };

    return [
      { label: "Total Activities", value: stats.total, icon: HiEye, color: "text-blue-500" },
      { label: "Likes", value: stats.likes, icon: HiHeart, color: "text-red-500" },
      { label: "Movies Watched", value: stats.watched, icon: HiEye, color: "text-green-500" },
      { label: "Reviews", value: stats.reviews, icon: HiChatBubbleLeft, color: "text-purple-500" },
      { label: "Ratings", value: stats.ratings, icon: HiStar, color: "text-yellow-500" },
      { label: "New Follows", value: stats.follows, icon: HiUsers, color: "text-indigo-500" },
    ];
  };

  const statsData = getStatsData();

  if (feeds.length === 0) return null;

  return (
    <div className="bg-secondaryBg border border-border rounded-xl p-6 mb-6">
      <h3 className="text-lg font-semibold text-foreground mb-4">Activity Overview</h3>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {statsData.map((stat, index) => {
          const IconComponent = stat.icon;
          
          return (
            <div
              key={index}
              className="flex flex-col items-center p-3 bg-mainBg/50 rounded-lg border border-border/50 hover:border-primary/20 transition-colors"
            >
              <div className={`p-2 rounded-full bg-secondaryBg ${stat.color}`}>
                <IconComponent className="w-4 h-4" />
              </div>
              <span className="text-xl font-bold text-foreground mt-2">{stat.value}</span>
              <span className="text-xs text-textMuted text-center leading-tight">{stat.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default FeedStats;
