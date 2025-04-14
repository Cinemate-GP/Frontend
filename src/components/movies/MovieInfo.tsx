'use client'
import {MoviePoster} from "./MoviePoster";
import {MovieGenres} from "./MovieGeners";
import {MovieActions} from "./MovieActions";
import { useMovieInfo } from "@/hooks/useMovieInfo";
import RatingModal from "../modals/RatingModal";
import { formatDuration } from "@/lib/utils";
import { GoStarFill } from "react-icons/go";
import { LuCalendarClock } from "react-icons/lu";
import { IMAGEPOSTER } from "@/constants";
import { SkeletonMovieInfo } from "../skeletons";
import { Movie } from "@/lib/types";
import { useCallback, useState } from "react";

interface MovieInfoProps {
  info: Movie;
  loading: boolean;
}


const MovieInfo: React.FC<MovieInfoProps> = ({ info, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rated, setRated] = useState(false);
  const { liked,watched,onWatched,backdropImage, toggleLike, addToWatchlist } = useMovieInfo(info);
  const setIsRated = useCallback((rated: boolean) => setRated(rated), []);
  

  if (loading) return <SkeletonMovieInfo />;

  const backgroundImage = backdropImage || (info.poster_path ? `${IMAGEPOSTER}${info.poster_path}` : "");

  return (
    <div
      className="relative w-full h-screen bg-cover bg-top"
      style={{ backgroundImage: backgroundImage ? `url(${backgroundImage})` : undefined }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 via-10% to-black/40">
        <div className="absolute w-full flex flex-col lg:flex-row justify-around items-center top-[50%] -translate-y-1/2 px-5 xl:px-16">
          <MoviePoster poster_path={info.poster_path!} title={info.title} />
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
            <h2 className="tracking-widest text-4xl xl:text-5xl font-bold">
              {info.title || "Untitled"}
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              {info.release_date && <span className="flex items-center gap-1"><LuCalendarClock />{info.release_date}</span>}
              <span className="flex items-center gap-1"><GoStarFill color="gold" />3.5</span>
              {info.runtime && <span>{formatDuration(info.runtime)}</span>}
            </div>
            <MovieGenres genres={info.genresDetails || []} />
            {info.overview && <p className="w-full md:max-w-[60%]">{info.overview}</p>}
            <MovieActions
              liked={liked}
              watched={watched}
              rated={rated}
              onWatched={onWatched}
              onLikeToggle={toggleLike}
              onWatchlist={addToWatchlist}
              onRate={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RatingModal
          tmdbId={info.tmdbId!}
          title={info.title!}
          poster_path={info.poster_path!}
          onclose={() => setIsModalOpen(false)}
          onRate={setIsRated}
        />
      )}
    </div>
  );
};

export default MovieInfo;
