/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
interface MovieCardProps {
  id?: number;
  tmdbid: number;
  title: string;
  image: string;
  rating?: number;
  cardType?: string;
}

const MovieCard = (movie: MovieCardProps) => {
  if (movie.cardType === "top10") {
    return (
      <Link href={`/pages/movies/${movie.tmdbid}`}>
        <div className="movie-card flex items-end group">
          <span
            className={`!text-[90px] lg:!text-[128px] -z-10 absolute text-stroke-primary -bottom-2 sm:-bottom-6 md:-bottom-8 ${
              movie.id === 10
                ? "-left-[5rem] sm-left-[5rem] md:-left-28 w-[200px] tracking-[-9px] md:tracking-[-18px]"
                : "-left-[40px] sm:-left-[36px]  md:-left-[64px] "
            } ${
              movie.id === 10
                ? "group-hover:-left-20 sm:grou-hover-left-24 md:group-hover:-left-28"
                : "group-hover:-left-[44px] md:group-hover:-left-[68px] "
            } "group-hover:-bottom-8 group-hover:scale-110 transition-all duration-500  group-hover:text-transparent group-hover:bg-clip-text text-stroke-primary group-hover:bg-gradient-to-r group-hover:from-red-600 group-hover:to-black `}
          >
            {movie.id}
          </span>
          <Image
            src={movie.image}
            alt={movie.title}
            width={300}
            height={450}
            className="border-2 border-transparent group-hover:border-gray-700 transition-all duration-500"
          />
        </div>
      </Link>
    );
  } else {
    return (
      <Link href={`/pages/movies/${movie.tmdbid}`}>
        <div className="relative group overflow-hidden rounded-lg">
          <img
            src={movie.image}
            alt={movie.title}
            width={300}
            height={450}
            loading="lazy"
            decoding="async"
            className="group-hover:scale-110 transition-all duration-500 ease-in-out h-auto w-[300px] max-h-[450px] object-cover rounded"
          />
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-black/40 to-black/90 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
            <div className="flex flex-col justify-end h-full p-4 relative group-hover:top-0 top-[3rem] transition-all duration-500">
              <h4>{movie.title}</h4>
              <span className="flex items-center gap-2 font-light">
                <FaStar className="text-primary" />
                {movie.rating ? "0.0" : "6.6"}
              </span>
            </div>
          </div>
        </div>
      </Link>
    );
  }
};

export default MovieCard;
