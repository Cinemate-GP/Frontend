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
      <div className="text-center max-w-md w-full bg-secondaryBg border border-border rounded-2xl shadow-lg p-8">
        {/* Icon */}
        <div className="mb-6">
          <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center border border-primary/20">
            <HiOutlineUsers className="w-10 h-10 text-primary" />
          </div>
        </div>
        {/* Text Content */}
        <h2 className="text-2xl font-bold text-foreground mb-3">Your feed is empty</h2>
        <p className="text-textMuted mb-8 leading-relaxed text-base">
          Start following other users or explore movies to see activities in your feed.
        </p>
        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={handleFindUsers}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-primary hover:bg-primaryHover text-white rounded-lg transition-colors duration-200 font-medium shadow-md"
          >
            <BiSearchAlt className="w-4 h-4" />
            Find Users
          </button>
          <Link
            href="/movies"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-background hover:bg-primary/10 text-foreground border border-border rounded-lg transition-all duration-200 font-medium hover:border-primary/50 shadow-md"
          >
            <MdExplore className="w-4 h-4" />
            Explore Movies
          </Link>
        </div>
        {/* Additional Help Text */}
        <div className="mt-8 p-4 bg-background rounded-lg border border-border">
          <p className="text-sm text-textMuted">
            <span className="font-medium text-foreground">Pro tip:</span> Follow users who have similar movie tastes 
            to discover new films and see their reviews and ratings!
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmptyFeedState;
