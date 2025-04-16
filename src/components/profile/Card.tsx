import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaStar } from "react-icons/fa6";
interface MoveProps {
  image: string;
  title: string;
  rating: number;
  tmdbid: number;
  movieId: number;
  type: string;
}
const Card = (movie: MoveProps) => {
  return (
    <Link href={`/pages/movies/${movie.tmdbid}`}>
      <div className="relative group overflow-hidden rounded-lg">
        <Image
          src={movie.image}
          alt={movie.title}
          width={300}
          height={450}
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
};

export default Card;
