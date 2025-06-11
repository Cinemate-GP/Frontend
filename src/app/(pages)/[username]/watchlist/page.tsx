"use client";
import { useParams, redirect } from "next/navigation";
import { getUserId } from "@/lib/utils";
import Card from "@/components/profile/Card";
import SectionTitle from "@/components/SectionTitle";
import { CardSkeleton } from "@/components/skeletons";
import { withProfileContainer } from "@/hoc/withProfileContainer";
import { ProfileCard } from "@/lib/types";

interface ComponentProps {
  resources: ProfileCard[] | null;
  loading: boolean;
  onDelete: (movieId: number) => void;
}

const UserWatchList = ({resources,loading,onDelete}:ComponentProps) => {
  const params = useParams();
  const username = params.username as string;
  const currentUserId = getUserId();
  
  // Only allow access to own profile for this functionality
  if (username !== currentUserId) {
    redirect(`/${username}`);
  }
 
  return (
    <div className="mt-5">
      <SectionTitle title="Watchlist Movies" />
      {loading && <CardSkeleton />}
      {resources?.length === 0 && <p>Thre is no wathlist movies yet</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {resources?.map((movie) => (
          <Card
            key={movie.tmdbId}
            tmdbid={movie.tmdbId}
            type="Watchlist"
            title={movie.title}
            onDelete={onDelete}
            image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default withProfileContainer<ProfileCard>(
  UserWatchList,
  "/api/Profile/WatchlistMovies"
);
