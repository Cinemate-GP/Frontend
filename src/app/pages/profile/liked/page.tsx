"use client";
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

const Liked = ({ resources, loading, onDelete }: ComponentProps) => {
  return (
    <div className="mt-5">
      <SectionTitle title="Liked Movies" />
      {loading && <CardSkeleton />}
      {!loading && resources?.length === 0 && <p>There are no Liked Movies</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {resources?.map((movie) => (
          <Card
            key={movie.tmdbId}
            movieId={movie.movieId}
            tmdbid={movie.tmdbId}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/original/${movie.poster_path}`}
            type="Like"
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default withProfileContainer<ProfileCard>(
  Liked,
  "/api/Profile/LikedMovies"
);
