'use client'
import MovieCard from "@/components/MovieCard";
import SectionTitle from "@/components/SectionTitle";
import { CardSkeleton } from "@/components/skeletons";
import useFetch from "@/hooks/useFetch";
interface Movie {
  id: number;
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: number;
}
const UserWatchList = () => {
  const { data, loading } = useFetch<Movie[]>("/api/Movie/top-ten");
  return (
    <div className="mt-5">
    <SectionTitle title="Recommend Movies" />
    {loading ? (
      <CardSkeleton />
    ) : (
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {data?.length === 0 && <p>There is no Recommend Movies Yet</p>}
        {data?.map((movie) => (
          <MovieCard
            key={movie.id}
            tmdbid={movie.tmdbId}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
          />
        ))}
      </div>
    )}
  </div>
  );
};

export default UserWatchList;
