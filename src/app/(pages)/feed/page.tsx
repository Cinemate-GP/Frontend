"use client";
import { useState, useMemo } from "react";
import FeedCard from "@/components/feed/FeedCard";
import { FeedHeader, EmptyFeedState, FeedStats } from "@/components/feed";
import { FeedCardSkelton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";

interface Feed {
  userId: string;
  fullName: string;
  profilePic: string;
  type: string;
  id: number;
  posterPath: string;
  name: string;
  description: string;
  createdOn: string;
}

const FeedPage = () => {
  const { data: feeds, loading } = useFetch<Feed[] | null>("/api/Profile/feed");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const filteredFeeds = useMemo(() => {
    if (!feeds || activeFilters.length === 0) return feeds;
    return feeds.filter(feed => 
      activeFilters.some(filter => 
        filter.toLowerCase() === feed.type.toLowerCase()
      )
    );
  }, [feeds, activeFilters]);

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  if (loading) return <FeedCardSkelton />;
  return (
    <div className="min-h-screen bg-mainBg">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <div className="max-w-4xl mx-auto">
          {/* Feed Header */}
          <div className="mb-6">
            <FeedHeader onFilterChange={handleFilterChange} />
          </div>
          
          {feeds?.length === 0 ? (
            <EmptyFeedState />
          ) : (
            <>
              <FeedStats feeds={filteredFeeds || []} />
              
              {filteredFeeds?.length === 0 ? (
                <div className="bg-secondaryBg rounded-xl shadow-sm p-6 text-center">
                  <div className="w-16 h-16 mx-auto mb-4 bg-primary/10 rounded-full flex items-center justify-center">
                    <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 4a1 1 0 011-1h16a1 1 0 011 1v2.586a1 1 0 01-.293.707l-6.414 6.414a1 1 0 00-.293.707V17l-4 4v-6.586a1 1 0 00-.293-.707L3.293 7.707A1 1 0 013 7V4z" />
                    </svg>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">No matching activities</h3>
                  <p className="text-textMuted mb-6">We couldn&apos;t find any activities that match your current filters.</p>
                  <button
                    onClick={() => setActiveFilters([])}
                    className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg transition-colors duration-200 font-medium"
                  >
                    Clear All Filters
                  </button>
                </div>
              ) : (
                <div className="space-y-4">
                  {filteredFeeds?.map((feed, index) => (
                    <div 
                      key={`${feed.userId}-${feed.createdOn}`}
                      className="opacity-0 animate-fade-in-up"
                      style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'forwards' }}
                    >
                      <FeedCard
                        id={feed.id}
                        userId={feed.userId}
                        fullName={feed.fullName}
                        profilePic={feed.profilePic}
                        type={feed.type}
                        posterPath={feed.posterPath}
                        actionTitle={feed.name}
                        description={feed.description}
                        time={feed.createdOn}
                      />
                    </div>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FeedPage;
