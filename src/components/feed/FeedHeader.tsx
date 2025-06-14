import React from "react";
import { BiRefresh } from "react-icons/bi";
import { MdOutlineDynamicFeed } from "react-icons/md";
import FeedFilters from "./FeedFilters";

interface FeedHeaderProps {
  onFilterChange?: (filters: string[]) => void;
}

const FeedHeader: React.FC<FeedHeaderProps> = ({ onFilterChange }) => {
  const handleRefresh = () => {
    window.location.reload();
  };  
    return (
    <div className="bg-secondaryBg rounded-xl shadow-sm p-4 sm:p-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        {/* Header Title Section */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-primary/10 rounded-xl">
            <MdOutlineDynamicFeed className="w-6 h-6 text-primary" />
          </div>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold text-foreground">
              Activity Feed
            </h1>
            <p className="text-sm text-textMuted">
              Keep up with what your network is watching
            </p>
          </div>
        </div>
        
        {/* Controls Section */}
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <div className="flex-1 sm:flex-none">
            <FeedFilters onFilterChange={onFilterChange} />
          </div>
            <button
            onClick={handleRefresh}
            className="inline-flex items-center justify-center p-2.5 bg-mainBg hover:bg-hoverBg 
                     text-foreground rounded-lg transition-colors"
            title="Refresh feed"
          >
            <BiRefresh className="w-5 h-5" />
            <span className="sr-only">Refresh</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default FeedHeader;
