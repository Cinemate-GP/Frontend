"use client";
import MovieCard from "@/components/MovieCard";
import SectionTitle from "@/components/SectionTitle";
import { IMAGEPOSTER } from "@/constants";
import { RootState } from "@/redux/store";
import { useSelector } from "react-redux";
const Watched = () => {
  const { liked:likedMovies } = useSelector((state: RootState) => state.liked);

  return (
    <div className="mt-5">
      <SectionTitle title="Watched Movies" />
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {likedMovies?.length === 0 && <p>There is no Watched Movies yet</p>}
        {likedMovies?.map((movie) => (
          <MovieCard
            key={movie.tmdbId}
            tmdbid={movie.tmdbId}
            title={movie.title}
            image={`${IMAGEPOSTER}${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Watched;
