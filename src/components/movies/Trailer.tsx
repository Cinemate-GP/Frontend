/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import SectionTitle from "../SectionTitle";
import { IoPlay } from "react-icons/io5";
import { IMAGEPOSTER } from "@/constants";
import { SkeletonTrailer } from "../skeletons";

export default function Trailer({
  trailer,
  image,
  loading,
}: {
  trailer: string | undefined;
  image: string | undefined;
  loading: boolean;
}) {
  const [isPlaying, setIsPlaying] = useState(false);

  if (loading) return <SkeletonTrailer />;
  return (
    <div className="bg-black rounded-lg section">
      <SectionTitle title="Trailer" />
      <div className="mt-4 relative rounded-lg overflow-hidden w-full h-[75vh] mb-[2rem]">
        {isPlaying ? (
          <iframe
            className="w-full h-full rounded-lg"
            src={`https://www.youtube.com/embed/${trailer}?si=Jcm0QOB1ZJxU8RVS&&autoplay=1`}
            allowFullScreen
            allow="autoplay; encrypted-media"
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
