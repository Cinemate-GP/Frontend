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
    <div className="bg-secondaryBg rounded-xl shadow-sm p-6 md:p-8">
      <div className="flex flex-col items-center text-center">
        {/* Illustration */}
        <div className="mb-6 relative">
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center">
            <HiOutlineUsers className="w-10 h-10 text-primary" />
          </div>
          <div className="absolute -right-2 -bottom-2 w-8 h-8 bg-amber-500/10 rounded-full flex items-center justify-center">
            <MdExplore className="w-5 h-5 text-amber-500" />
          </div>
        </div>

        {/* Content */}
        <h2 className="text-2xl font-bold text-foreground mb-2">
          Your feed is empty
        </h2>
        <p className="text-textMuted max-w-md mb-8">
          Follow other users or explore movies to see their activity in your feed. Discover what others are watching, rating, and reviewing.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center mb-8 w-full max-w-xs sm:max-w-md">
          <button
            onClick={handleFindUsers}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primary/90 
                     text-white rounded-lg transition-colors duration-200 font-medium w-full"
          >
            <BiSearchAlt className="w-4 h-4" />
            <span>Find Users</span>
          </button>
            <Link
            href="/movies"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-mainBg hover:bg-hoverBg
                     text-foreground rounded-lg transition-colors duration-200 font-medium w-full"
          >
            <MdExplore className="w-4 h-4" />
            <span>Explore Movies</span>
          </Link>
        </div>

        {/* Helpful Tips */}        <div className="w-full max-w-md bg-mainBg rounded-lg p-4">
          <div className="flex gap-3">
            <div className="w-8 h-8 bg-blue-500/10 rounded-full flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-blue-500" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="text-left">
              <h4 className="font-medium text-foreground text-sm mb-1">Pro Tips</h4>
              <p className="text-sm text-textMuted">
                Follow users with similar movie tastes to discover new films through their reviews and ratings. Engage with their activity to build your movie community!
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedState;
