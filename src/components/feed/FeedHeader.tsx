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
  };  return (
    <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
      <div className="flex items-center gap-3">
        <div className="p-2 bg-primary/10 rounded-lg">
          <HiSparkles className="w-6 h-6 text-primary" />
        </div>
        <div>
          <h1 className="text-2xl md:text-3xl font-bold text-foreground">
            Feed
          </h1>
          <p className="text-textMuted text-sm">
            Latest activities from your network
          </p>
        </div>
      </div>
      
      <div className="flex items-center gap-3 w-full sm:w-auto">
        <div className="flex-1 sm:flex-none">
          <FeedFilters onFilterChange={onFilterChange} />
        </div>
        
        <button
          onClick={handleRefresh}
          className="flex items-center gap-2 px-3 py-2 bg-secondaryBg hover:bg-secondaryBg/80 
                     text-foreground border border-border rounded-lg transition-colors 
                     duration-200 text-sm font-medium"
        >
          <BiRefresh className="w-4 h-4" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>
    </div>
  );
};

export default FeedHeader;
