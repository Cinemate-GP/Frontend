import React, { useState } from "react";
import { HiFilter } from "react-icons/hi";
import { FaHeart, FaPlayCircle, FaStar } from "react-icons/fa";
import { MdOutlineRateReview } from "react-icons/md";
import { RiUserFollowLine } from "react-icons/ri";
import { motion, AnimatePresence } from "framer-motion";

interface FeedFiltersProps {
  onFilterChange?: (filters: string[]) => void;
}

const FeedFilters: React.FC<FeedFiltersProps> = ({ onFilterChange }) => {
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [isOpen, setIsOpen] = useState(false);

  const filterOptions = [
    { id: "like", label: "Likes", icon: FaHeart, color: "text-red-500" },
    { id: "Watched", label: "Watched", icon: FaPlayCircle, color: "text-emerald-500" },
    { id: "review", label: "Reviews", icon: MdOutlineRateReview, color: "text-blue-500" },
    { id: "rate", label: "Ratings", icon: FaStar, color: "text-amber-500" },
    { id: "follow", label: "Follows", icon: RiUserFollowLine, color: "text-violet-500" },
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
        className={`flex items-center gap-2 px-3 py-2 bg-secondaryBg hover:bg-secondaryBg/80 
                   text-foreground border rounded-lg transition-colors duration-200 text-sm font-medium
                   ${activeFilters.length > 0 ? 'border-primary' : 'border-border'}`}
      >
        <HiFilter className="w-4 h-4" />
        <span className="hidden sm:inline">Filter</span>
        {activeFilters.length > 0 && (
          <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-medium min-w-[18px] text-center">
            {activeFilters.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div 
            className="absolute top-full mt-2 right-0 bg-secondaryBg border border-border 
                       rounded-lg shadow-lg z-50 min-w-48 overflow-hidden"
            initial={{ opacity: 0, y: -10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -10, scale: 0.95 }}
            transition={{ duration: 0.15 }}
          >
            <div className="p-3">
              <div className="flex items-center justify-between mb-3">
                <h3 className="font-medium text-foreground text-sm">Filter activities</h3>
                {activeFilters.length > 0 && (
                  <button
                    onClick={clearFilters}
                    className="text-xs text-primary hover:text-primary/80 font-medium"
                  >
                    Clear
                  </button>
                )}
              </div>
              
              <div className="space-y-1">
                {filterOptions.map((option) => {
                  const IconComponent = option.icon;
                  const isActive = activeFilters.includes(option.id);
                  
                  return (
                    <button
                      key={option.id}
                      onClick={() => toggleFilter(option.id)}
                      className={`w-full flex items-center gap-3 px-2 py-2 rounded-md 
                                 transition-colors duration-150 text-left text-sm
                                 ${isActive 
                                   ? 'bg-primary/10 text-foreground border border-primary/20' 
                                   : 'hover:bg-mainBg/50 text-foreground'}`}
                    >
                      <IconComponent className={`w-4 h-4 ${option.color}`} />
                      <span className="flex-1">{option.label}</span>
                      {isActive && (
                        <div className="w-2 h-2 bg-primary rounded-full" />
                      )}
                    </button>
                  );
                })}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Overlay to close dropdown */}
      <AnimatePresence>
        {isOpen && (
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedFilters;
