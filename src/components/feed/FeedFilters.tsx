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
  const [isOpen, setIsOpen] = useState(false);  const filterOptions = [
    { id: "like", label: "Likes", icon: FaHeart, color: "text-red-500", bgColor: "bg-red-500/10" },
    { id: "watched", label: "Watched", icon: FaPlayCircle, color: "text-emerald-500", bgColor: "bg-emerald-500/10" },
    { id: "review", label: "Reviews", icon: MdOutlineRateReview, color: "text-blue-500", bgColor: "bg-blue-500/10" },
    { id: "rate", label: "Ratings", icon: FaStar, color: "text-amber-500", bgColor: "bg-amber-500/10" },
    { id: "follow", label: "Follows", icon: RiUserFollowLine, color: "text-violet-500", bgColor: "bg-violet-500/10" },
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
    <div className="relative w-full sm:w-auto">      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`flex items-center gap-2 px-4 py-2.5 w-full sm:w-auto justify-center sm:justify-start
                  bg-mainBg hover:bg-hoverBg text-foreground rounded-lg transition-colors text-sm font-medium
                  ${activeFilters.length > 0 ? 'ring-2 ring-primary/20' : ''}`}
      >
        <HiFilter className="w-4 h-4" />
        <span className="inline">Filter</span>
        {activeFilters.length > 0 && (
          <span className="bg-primary text-white text-xs px-1.5 py-0.5 rounded-full font-medium min-w-[18px] text-center">
            {activeFilters.length}
          </span>
        )}
      </button>

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop for mobile */}
            <motion.div
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 sm:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsOpen(false)}
            />
              <motion.div 
              className="absolute top-full right-0 mt-2 bg-secondaryBg shadow-lg
                       rounded-lg z-50 w-64 overflow-hidden"
              initial={{ opacity: 0, y: -10, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -10, scale: 0.95 }}
              transition={{ duration: 0.15 }}
            >
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="font-medium text-foreground text-sm">Filter activities</h3>
                  {activeFilters.length > 0 && (
                    <button
                      onClick={clearFilters}
                      className="text-xs text-primary hover:text-primary/80 font-medium"
                    >
                      Clear all
                    </button>
                  )}
                </div>
                
                <div className="space-y-1.5">
                  {filterOptions.map((option) => {
                    const IconComponent = option.icon;
                    const isActive = activeFilters.includes(option.id);
                    
                    return (
                      <motion.button
                        key={option.id}
                        onClick={() => toggleFilter(option.id)}
                        className={`w-full flex items-center gap-3 px-3 py-2 rounded-lg 
                                 transition-all duration-200 text-left text-sm                                 ${isActive 
                                   ? 'bg-primary/10 text-primary font-medium' 
                                   : 'text-foreground hover:bg-hoverBg'}`}
                        whileTap={{ scale: 0.98 }}
                      >
                        <div className={`w-7 h-7 rounded-lg ${option.bgColor} flex items-center justify-center`}>
                          <IconComponent className={`w-3.5 h-3.5 ${option.color}`} />
                        </div>
                        <span>{option.label}</span>
                      </motion.button>
                    );
                  })}
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FeedFilters;
