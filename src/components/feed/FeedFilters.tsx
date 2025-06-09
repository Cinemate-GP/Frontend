import React, { useState } from "react";
import { HiFilter } from "react-icons/hi";
import { FaHeart, FaPlayCircle, FaStar } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";

interface FeedFiltersProps {
  onFilterChange?: (filters: string[]) => void;
}

const FeedFilters: React.FC<FeedFiltersProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { id: "like", label: "Likes", icon: FaHeart, color: "text-red-500" },
    { id: "Watched", label: "Watched", icon: FaPlayCircle, color: "text-green-500" },
    { id: "review", label: "Reviews", icon: MdOutlineRateReview, color: "text-blue-500" },
    { id: "rate", label: "Ratings", icon: FaStar, color: "text-yellow-500" },
    { id: "follow", label: "Follows", icon: RiUserFollowLine, color: "text-purple-500" },
  ];

  const toggleFilter = (filterId: string) => {
    const newFilters = activeFilters.includes(filterId)
      ? activeFilters.filter(id => id !== filterId)
      : [...activeFilters, filterId];
    
    setActiveFilters(newFilters);
    onFilterChange?.(newFilters);
  };

  const clearFilters = () => {
    setActiveFilters([]);
    onFilterChange?.([]);
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2 bg-secondaryBg hover:bg-hoverBg 
                   text-foreground border rounded-lg transition-all duration-200
                   ${activeFilters.length > 0 ? 'border-primary' : 'border-border hover:border-primary/50'}`}
      >
        <HiFilter className="w-4 h-4" />
        <span className="hidden sm:inline">Filter</span>
        {activeFilters.length > 0 && (
          <span className="bg-primary text-white text-xs px-2 py-1 rounded-full">
            {activeFilters.length}
          </span>
        )}
      </button>

      {isOpen && (
        <div className="absolute top-full mt-2 right-0 bg-secondaryBg border border-border 
                       rounded-lg shadow-lg z-10 min-w-48">
          <div className="p-3">
            <div className="flex items-center justify-between mb-3">
              <h3 className="font-medium text-foreground">Filter by activity</h3>
              {activeFilters.length > 0 && (
                <button
                  onClick={clearFilters}
                  className="text-xs text-primary hover:text-primaryHover"
                >
                  Clear
                </button>
              )}
            </div>
            
            <div className="space-y-2">
              {filterOptions.map((option) => {
                const IconComponent = option.icon;
                const isActive = activeFilters.includes(option.id);
                
                return (
                  <button
                    key={option.id}
                    onClick={() => toggleFilter(option.id)}
                    className={`w-full flex items-center gap-3 px-3 py-2 rounded-md 
                               transition-colors duration-200 text-left
                               ${isActive 
                                 ? 'bg-primary/10 text-primary border border-primary/20' 
                                 : 'hover:bg-hoverBg text-foreground'}`}
                  >
                    <IconComponent className={`w-4 h-4 ${isActive ? 'text-primary' : option.color}`} />
                    <span className="text-sm">{option.label}</span>
                    {isActive && (
                      <div className="ml-auto w-2 h-2 bg-primary rounded-full"></div>
                    )}
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}

      {/* Overlay to close dropdown */}
      {isOpen && (
        <div 
          className="fixed inset-0 z-[5]" 
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default FeedFilters;
