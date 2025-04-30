"use client";
import Card from "@/components/profile/Card";
import SectionTitle from "@/components/SectionTitle";
import { CardSkeleton } from "@/components/skeletons";
import { IMAGEPOSTER } from "@/constants";
import { withProfileContainer } from "@/hoc/withProfileContainer";
import { ProfileCard } from "@/lib/types";
interface RatedCard extends ProfileCard {
  stars?: number;
}
interface ComponentProps {
  resources: RatedCard[] | null;
  loading: boolean;
  onDelete: (movieId: number) => void;
}
const Rated = ({ resources, loading, onDelete }: ComponentProps) => {
  return (
    <div className="mt-5">
      <SectionTitle title="Rated Movies" />
      {loading && <CardSkeleton />}
      {resources?.length === 0 && <p>There is no Rated Movies yet</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {resources?.map((movie) => (
          <Card
            key={movie.tmdbId}
            tmdbid={movie.tmdbId}
            title={movie.title}
            stars={movie.stars}
            type="Rate"
            image={`${IMAGEPOSTER}${movie.poster_path}`}
            onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
};

export default withProfileContainer<ProfileCard>(
  Rated,
  "/api/Profile/RatedMovies"
);
