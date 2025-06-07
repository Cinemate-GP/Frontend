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
    return feeds.filter(feed => activeFilters.includes(feed.type));
  }, [feeds, activeFilters]);

  const handleFilterChange = (filters: string[]) => {
    setActiveFilters(filters);
  };

  if (loading) return <FeedCardSkelton />;

  return (
    <div className="min-h-screen bg-mainBg">      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-10">
        <FeedHeader onFilterChange={handleFilterChange} />
        
        {feeds?.length === 0 ? (
          <EmptyFeedState />
        ) : (
          <>
            <FeedStats feeds={filteredFeeds || []} />
            
            {filteredFeeds?.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-textMuted">No activities match your current filters.</p>
                <button
                  onClick={() => setActiveFilters([])}
                  className="mt-2 text-primary hover:text-primaryHover text-sm"
                >
                  Clear filters to see all activities
                </button>
              </div>
            ) : (
              <div className="space-y-6">
                {filteredFeeds?.map((feed) => (
                  <FeedCard
                    key={`${feed.userId}-${feed.createdOn}`}
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
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default FeedPage;
