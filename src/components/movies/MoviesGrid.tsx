import MovieCard from "../MovieCard";
import { MovieGridSkeleton } from "../skeletons";
interface Movie {
  id?: number;
  movieId: number;
  tmdbId: number;
  title: string;
  poster_path: string;
}

const MoviesGrid = ({ movieList,loading }: { movieList: Movie[] | null,loading:boolean}) => {
  if(loading) return <MovieGridSkeleton />
  return (
    <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-x-4 gap-y-7 mt-5 p-4">
      {movieList?.length === 0 && <p>No Movies Found</p>}
      {movieList?.map((movie) => (
        <MovieCard key={movie.movieId}
         tmdbid={movie.tmdbId}
        title={movie.title}
        image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`} />
      ))}
    </div>
  );
};

export default MoviesGrid;
