import React from "react";
import Link from "next/link";
import { HiOutlineUsers } from "react-icons/hi2";
import { BiSearchAlt } from "react-icons/bi";
import { MdExplore } from "react-icons/md";

const EmptyFeedState: React.FC = () => {
  const handleFindUsers = () => {
    // Focus on the navbar search input
    const searchInput = document.querySelector('input[placeholder*="Search"]') as HTMLInputElement;
    if (searchInput) {
      searchInput.focus();
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="text-center max-w-lg w-full bg-secondaryBg border border-border rounded-lg p-8">
        {/* Simple icon */}
        <div className="mb-6">
          <div className="w-16 h-16 mx-auto bg-primary/10 rounded-lg flex items-center justify-center">
            <HiOutlineUsers className="w-8 h-8 text-primary" />
          </div>
        </div>

        {/* Content */}
        <div>
          <h2 className="text-2xl font-bold text-foreground mb-3">
            Your feed is empty
          </h2>
          <p className="text-textMuted mb-8 leading-relaxed">
            Start following other users or explore movies to see activities in your feed.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-6">
          <button
            onClick={handleFindUsers}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 
                       text-white rounded-lg transition-colors duration-200 font-medium"
          >
            <BiSearchAlt className="w-4 h-4" />
            <span>Find Users</span>
          </button>
          
          <Link
            href="/movies"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-secondaryBg hover:bg-secondaryBg/80 
                       text-foreground border border-border rounded-lg transition-colors duration-200 font-medium"
          >
            <MdExplore className="w-4 h-4" />
            <span>Explore Movies</span>
          </Link>
        </div>

        {/* Help Text */}
        <div className="p-4 bg-mainBg/50 border border-border/50 rounded-lg">
          <div className="flex items-start gap-3">
            <div className="w-6 h-6 bg-primary/10 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
              <svg className="w-3 h-3 text-primary" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-sm text-textMuted leading-relaxed">
                <span className="font-medium text-foreground">Pro tip:</span> Follow users who have similar movie tastes 
                to discover new films and see their reviews and ratings!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedState;
