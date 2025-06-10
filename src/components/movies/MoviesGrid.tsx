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
  if (loading) return <MovieGridSkeleton />;  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-4 mt-5 p-4">
      {movieList?.length === 0 && <p className="col-span-full text-center text-gray-400 py-8">No Movies Found</p>}
      {movieList?.map((movie) => (
        <div key={movie.tmdbId} className="w-full">
          <MovieCard
            tmdbid={movie.tmdbId}
            imdbRating={movie.imdbRating}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/original//${movie.posterPath}`}
          />
        </div>
      ))}
    </div>
  );
};

export default MoviesGrid;
