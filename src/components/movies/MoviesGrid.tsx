import MovieCard from "../MovieCard";
import { MovieGridSkeleton } from "../skeletons";
interface Movie {
  tmdbId: number;
  imdbRating: string;
  title: string;
  posterPath: string;
}

const MoviesGrid = ({
  movieList,
  loading,
}: {
  movieList: Movie[] | null;
  loading: boolean;
}) => {
  if (loading) return <MovieGridSkeleton />;
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-7 mt-5 p-4">
      {movieList?.length === 0 && <p>No Movies Found</p>}
      {movieList?.map((movie) => (
        <MovieCard
          key={movie.tmdbId}
          tmdbid={movie.tmdbId}
          imdbRating={movie.imdbRating}
          title={movie.title}
          image={`https://image.tmdb.org/t/p/original//${movie.posterPath}`}
        />
      ))}
    </div>
  );
};

export default MoviesGrid;
