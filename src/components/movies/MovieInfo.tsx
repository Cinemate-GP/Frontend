"use client";
import { MoviePoster } from "./MoviePoster";
import { MovieGenres } from "./MovieGeners";
import { MovieActions } from "./MovieActions";
import RatingModal from "../modals/RatingModal";
import { formatDuration } from "@/lib/utils";
import { GoStarFill } from "react-icons/go";
import { LuCalendarClock } from "react-icons/lu";
import { SkeletonMovieInfo } from "../skeletons";
import { useState } from "react";
import { IMAGEPOSTER } from "@/constants";
import { FaClock } from "react-icons/fa6";
import Image from "next/image";

interface MovieInfoProps {
  info: {
    tmdbId: number | undefined;
    title: string | undefined;
    imdbRating: string | undefined;
    logoPath: string | undefined;
    posterPath: string | undefined;
    rottenTomatoesRating?: string | undefined;
    metacriticRating?: string | undefined;
    mpa?: string | undefined;
    backdropPath: string | undefined;
    tagline?: string | undefined;
    releaseDate?: string | undefined;
    runtime?: number | undefined;
    overview?: string | undefined;
    geners?: { name: string; id: number }[] | undefined;
    isLiked?: boolean | undefined;
    isWatched?: boolean | undefined;
    isInWatchList?: boolean | undefined;
    stars?: number | undefined;
    trailer?: string | undefined;
    streamingLink?: string | undefined;
  };
  loading: boolean;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ info, loading }) => {
  // Rated movie modal state
  const [isModalOpen, setIsModalOpen] = useState(false);
  // render selecton during waiting for data comming form backend
  if (loading) return <SkeletonMovieInfo />;

  return (
    <div
      className="relative w-full h-screen overflow-auto bg-cover bg-top"
      style={{ backgroundImage: `url(${IMAGEPOSTER}${info.backdropPath})` }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/80 via-10% to-black/40">
        <div className="absolute h-full  w-full flex flex-col lg:flex-row justify-around items-center top-[50%] -translate-y-1/2 px-5 xl:px-16">
          <MoviePoster 
            poster_path={info.posterPath!} 
            title={info.title} 
          />

          {/* movie details */}
          <div className="flex flex-col items-center text-center gap-3 max-w-3xl">
            {/* title */}
            {!info.logoPath && (
              <h2 className="tracking-widest text-white text-2xl md:text-4xl xl:text-5xl font-bold">
                {info.title || "Untitled"}
              </h2>
            )}
            {info.logoPath && (
              <div className="w-full max-w-[150px] sm:max-w-xs xl:max-w-[280px] mx-auto sm:mx-0">
                <Image
                  src={IMAGEPOSTER + info.logoPath}
                  width={200}
                  height={200}
                  alt="movie title"
                  className="w-full h-auto object-contain"
                />
              </div>
            )}
            {/* movie meta info */}

            <p className="text-white">{info.tagline}</p>
            {/* meta info */}
            <div className="flex flex-wrap justify-center gap-4 gap-y-0 text-lg text-white">
              <span className="flex items-center gap-1 text-[16px]">
                <LuCalendarClock />
                {info.releaseDate}
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
                {formatDuration(info.runtime)} 
              </span>
            </div>

            <MovieGenres genres={info.geners || []} />
            {info.overview && (
              <p className="w-full md:max-w-[60%] text-[14px] sm:text-[16px] text-white">
                {info.overview}
              </p>
            )}
            <MovieActions
              tmdbId={info.tmdbId!}
              stars={info.stars!}
              isLiked={info.isLiked!}
              isWatched={info.isWatched!}
              isInWatchList={info.isInWatchList!}
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
        />
      )}
    </div>
  );
};

export default MovieInfo;
