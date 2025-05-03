/* eslint-disable @next/next/no-img-element */
import { IMAGEPOSTER } from "@/constants";
import Link from "next/link";
import { FaYoutube, FaPlay } from "react-icons/fa";

export const MoviePoster = ({
  poster_path,
  title,
  trailer,
  streamingLink,
}: {
  poster_path: string;
  title?: string;
  trailer?: string;
  streamingLink?: string;
}) => {
  if (!poster_path) return null;

  return (
    <div className="flex flex-col items-center gap-3">
      <div className="relative group w-full hidden sm:block max-w-[250px] md:max-w-[280px] lg:max-w-[300px]">
        <img
          src={`${IMAGEPOSTER}${poster_path}`}
          alt={title || "Movie poster"}
          className="rounded-xl w-full h-auto aspect-[2/3] object-cover shadow-[0_8px_30px_rgb(0,0,0,0.12)] transition-all duration-300 group-hover:shadow-[0_8px_30px_rgb(0,0,0,0.3)] group-hover:scale-[1.01]"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-xl"></div>
      </div>
      
      {(trailer || streamingLink) && (
      <div className="flex flex-row gap-2 w-full mt-3 justify-center">
        {trailer && (
          <Link
            href={`https://www.youtube.com/watch?v=${trailer}`}
            target="_blank"
            className="flex items-center justify-center backdrop-blur-md bg-red-600/70 text-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-red-500/80 transition-all duration-300 shadow-lg group relative overflow-hidden flex-1 max-w-[140px] sm:max-w-[150px] border border-red-400/20"
          >
            <div className="absolute bg-white/10 h-full w-full left-0 top-0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
            <FaYoutube className="text-white text-base sm:text-lg mr-1.5 sm:mr-2" />
            <span className="font-medium tracking-wide text-xs sm:text-sm">Trailer</span>
          </Link>
        )}
        {streamingLink && (
          <Link
            href={`https://www.cineby.app/movie/${streamingLink}?play=true`}
            target="_blank"
            className="flex items-center justify-center backdrop-blur-md bg-blue-600/70 text-white rounded-lg sm:rounded-xl px-3 sm:px-4 py-2.5 sm:py-3 hover:bg-blue-500/80 transition-all duration-300 shadow-lg group relative overflow-hidden flex-1 max-w-[140px] sm:max-w-[150px] border border-blue-400/20"
          >
            <div className="absolute bg-white/10 h-full w-full left-0 top-0 opacity-0 group-hover:opacity-100 group-hover:animate-pulse transition-opacity"></div>
            <FaPlay className="text-white text-xs sm:text-sm mr-1.5 sm:mr-2" />
            <span className="font-medium tracking-wide text-xs sm:text-sm">Watch</span>
          </Link>
        )}
      </div>
      )}
    </div>
  );
};
