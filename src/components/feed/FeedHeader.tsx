import React from "react";
import { HiSparkles } from "react-icons/hi2";
import { BiRefresh } from "react-icons/bi";
import FeedFilters from "./FeedFilters";

interface FeedHeaderProps {
  onFilterChange?: (filters: string[]) => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ onFilterChange }) => {
  const handleRefresh = () => {
    window.location.reload();
  };

  return (
    <div className="flex items-center justify-between mb-6">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-full">
          <HiSparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl font-bold text-foreground">Your Feed</h1>
          <p className="text-textMuted text-sm">
            Stay updated with activities from your network
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3">
        <FeedFilters onFilterChange={onFilterChange} />
        
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-4 py-2 bg-secondaryBg hover:bg-hoverBg 
                     text-foreground border border-border rounded-lg transition-all 
                     duration-200 hover:border-primary/50 group"
        >
          <BiRefresh className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default FeedHeader;
