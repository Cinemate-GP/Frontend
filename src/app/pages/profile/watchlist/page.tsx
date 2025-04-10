"use client";
import MovieCard from "@/components/MovieCard";
import SectionTitle from "@/components/SectionTitle";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";

const UserWatchList = () => {
  const { watchlist: wathlistMovies } = useSelector((state: RootState) => state.watchlist);
  return (
    <div className="mt-5">
      <SectionTitle title="Watchlist Movies" />
      {wathlistMovies?.length === 0 && <p>Thre is no wathlist movies yet</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {wathlistMovies?.map((movie) => (
          <MovieCard
            key={movie.tmdbId}
            tmdbid={movie.tmdbId}
            title={movie.title}
            image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default UserWatchList;
