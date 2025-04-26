/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import { IMAGEPOSTER } from "@/constants";
import { SkeletonTrailer } from "../skeletons";

export default function Trailer({
  image,
  loading,
  id,
}: {
  image: string | undefined;
  loading: boolean;
  id: string | undefined;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (loading) return <SkeletonTrailer />;
  return (
    <div className="bg-black rounded-lg section">
      <div className="mt-4 relative rounded-lg overflow-hidden w-full max-w-[1200px] mx-auto h-auto aspect-video md:aspect-[16/9] max-h-[85vh] mb-[2rem]">
        {isPlaying ? (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://vidsrc.xyz/embed/movie?tmdb=${id}`}
            allowFullScreen
            allow="autoplay; encrypted-media"
            style={{ aspectRatio: '16/9' }}
          />
        ) : (
          <>
            <img
              src={IMAGEPOSTER + image}
              alt="Trailer Thumbnail"
              width="1000"
              height="500"
              className="object-cover w-full h-full"
              loading="lazy" 
            />
            <button
              onClick={() => setIsPlaying(true)}
              className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] flex items-center justify-center bg-black bg-opacity-80 py-4 w-20 h-12 rounded-md hover:bg-primary transition-all duration-300"
            >
              <IoPlay className="text-white text-4xl" />
            </button>
          </>
        )}
      </div>
    </div>
  );
}
