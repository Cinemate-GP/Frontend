"use client";
import { MoviePoster } from "./MoviePoster";
import { MovieGenres } from "./MovieGeners";
import { MovieActions } from "./MovieActions";
import { useMovieInfo } from "@/hooks/useMovieActions";
import RatingModal from "../modals/RatingModal";
import { formatDuration } from "@/lib/utils";
import { GoStarFill } from "react-icons/go";
import { LuCalendarClock } from "react-icons/lu";
import { SkeletonMovieInfo } from "../skeletons";
import { useCallback, useState } from "react";
import { IMAGEPOSTER } from "@/constants";
import { FaClock } from "react-icons/fa6";
import Image from "next/image";

interface MovieInfoProps {
  info: {
    tmdbId: number | undefined;
    title: string | undefined;
    imdbRating: string | undefined;
    posterPath: string | undefined;
    rottenTomatoesRating?: string | undefined;
    metacriticRating?: string | undefined;
    mpa?: string | undefined;
    backdropPath: string | undefined;
    tagline?: string | undefined;
    date?: string | undefined;
    time?: number | undefined;
    overview?: string | undefined;
    geners?: { name: string; id: number }[] | undefined;
  };
  loading: boolean;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ info, loading }) => {
  // Rated movie modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rated, setRated] = useState(false);

  // Movie actions
  const { liked, watched, onWatched, toggleLike, addToWatchlist } =
    useMovieInfo(info);
  const setIsRated = useCallback((rated: boolean) => setRated(rated), []);

  // render selecton during waiting for data comming form backend
  if (loading) return <SkeletonMovieInfo />;

  return (
    <div
      className="relative w-full h-screen bg-cover bg-top"
      style={{ backgroundImage: `url(${IMAGEPOSTER}${info.backdropPath})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 via-10% to-black/40">
        <div className="absolute w-full flex flex-col lg:flex-row justify-around items-center top-[50%] -translate-y-1/2 px-5 xl:px-16">
          <MoviePoster poster_path={info.posterPath!} title={info.title} />

          {/* movie details */}
          <div className="flex flex-col items-center text-center gap-3 xl:gap-6 max-w-3xl">
            {/* title */}
            <h2 className="tracking-widest text-2xl md:text-4xl xl:text-5xl font-bold">
              {info.title || "Untitled"}
            </h2>
            <p>{info.tagline}</p>
            {/* meta info */}
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              <span className="flex items-center gap-1 text-[16px]">
                <LuCalendarClock />
                {info.date}
              </span>
              <span className="text-[16px]">{info.mpa}</span>
              <span className="flex items-center gap-1 text-[16px]">
                <GoStarFill color="gold" />
                {info.imdbRating}
              </span>
              {info.rottenTomatoesRating && (
                <span className="flex items-center gap-1 text-[16px]">
                  <Image
                    src="/rotten-tomato.webp"
                    width={14}
                    height={14}
                    alt="tomato rating"
                  />
                  {info.rottenTomatoesRating}
                </span>
              )}

              {info.metacriticRating && (
                <span className="flex items-center gap-1 text-[16px]">
                  <Image
                    src="/rating.webp"
                    width={14}
                    height={14}
                    alt="metacritic rating"
                    className="w-[14px] md:h-[14px]"
                  />
                  {info.metacriticRating}
                </span>
              )}
              <span className="flex items-center gap-1 text-[16px]">
                <FaClock size={14} />
                {formatDuration(info.time)}
              </span>
            </div>

            <MovieGenres genres={info.geners || []} />
            {info.overview && (
              <p className="w-full md:max-w-[60%] text-[14px] sm:text-[16px]">
                {info.overview}
              </p>
            )}
            <MovieActions
              tmdbId={info.tmdbId!}
              liked={liked!}
              watched={watched!}
              rated={rated}
              onWatched={onWatched}
              onLikeToggle={toggleLike}
              onWatchlist={addToWatchlist}
              onReview={() => setIsModalOpen(true)}
            />
          </div>
        </div>
      </div>

      {/* Rated movie modal */}
      {isModalOpen && (
        <RatingModal
          tmdbId={info.tmdbId!}
          title={info.title!}
          poster_path={info.posterPath!}
          onclose={() => setIsModalOpen(false)}
          onRate={setIsRated}
        />
      )}
    </div>
  );
};

export default MovieInfo;
