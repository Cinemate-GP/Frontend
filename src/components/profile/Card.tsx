"use client";
import { getUserId } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useCookie } from "@/hooks/useCookie";
import { authFetch } from "@/lib/api";

interface MoveProps {
  image: string;
  title: string;
  imdbRating?: string;
  stars?: number;
  tmdbid: number;
  type: string;
  onDelete: (id: number) => void;
}

const Card = (movie: MoveProps) => {
  const token = useCookie();

  const handleDelete = async () => {
    movie?.onDelete(movie.tmdbid);
    try {
      const res = await authFetch(`/api/User${movie.type}Movie/Delete`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          tmdbId: movie.tmdbid,
          userId: getUserId(),
        }),
      });
      if (!res.ok) throw new Error("Failed to delete movie");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Link href={`/movies/${movie.tmdbid}`}>
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
            <div className="flex justify-between mt-3 flex-wrap gap-3">
              <h4>{movie.title}</h4>
              <button
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDelete();
                }}
                className="hover:text-primary duration-150 transition-all text-sm border border-white text-white rounded-lg px-2 leading-8"
              >
                Remove
              </button>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default Card;
