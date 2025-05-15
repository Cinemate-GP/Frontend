/* eslint-disable @next/next/no-img-element */
"use client";
import { useState, useRef } from "react";
import { IoPlay } from "react-icons/io5";
import { HiOutlineSwitchHorizontal } from "react-icons/hi";
import { IMAGEPOSTER, movieSources } from "@/constants";
import { SkeletonMovieStreaming } from "../skeletons";

type Props = {
  image?: string;
  loading: boolean;
  id?: string;
};

export default function MovieStreaming({ image, loading, id }: Props) {
  const [playing, setPlaying] = useState(false);
  const [source, setSource] = useState(movieSources[0]);
  const playerRef = useRef<HTMLDivElement>(null);

  if (loading) return <SkeletonMovieStreaming />;

  return (
    <section className="relative w-full mx-auto bg-secondaryBg backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-4 space-y-6">
      
      {/* Header: Source Selector */}
      <div className="flex flex-col lg:flex-row items-center justify-between gap-4 p-4 rounded-xl bg-sideNavBg text-foreground">
        
        <div className="flex items-center gap-3">
          <HiOutlineSwitchHorizontal className="text-primary text-xl" />
          <span className="text-sm font-semibold tracking-wide">Choose Source</span>
        </div>

        <div className="flex items-center gap-2 overflow-auto max-w-full custom-scrollbar">
          {movieSources.map((s) => (
            <button
              key={s.id}
              onClick={() => setSource(s)}
              className={`flex items-center text-xs justify-center gap-2 px-2 min-w-[92px] py-2 rounded-lg sm:text-sm transition ${
                source.id === s.id
                  ? "bg-primary text-white"
                  : "bg-black/40 text-gray-300 hover:bg-gray-700/60 hover:text-white"
              }`}
            >
              {source.id === s.id && <span className="w-2 h-2 bg-white rounded-full" />}
              {s.name}
            </button>
          ))}
        </div>
      </div>

      {/* Player */}
      <div ref={playerRef} className="relative w-full aspect-video rounded-xl overflow-hidden">
        {playing ? (
          <iframe
            src={source.url(id!)}
            allowFullScreen
            allow="autoplay; encrypted-media"
            title="Movie Player"
            className="w-full h-full rounded-xl"
          />
        ) : (
          <div className="relative w-full h-full group cursor-pointer">
            <img
              src={image ? IMAGEPOSTER + image : "/image-placeholder.png"}
              alt="Movie Thumbnail"
              className="object-cover w-full h-full rounded-xl transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />

            {/* Play Button */}
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <button
                onClick={() => setPlaying(true)}
                className="flex flex-col items-center gap-3"
              >
                <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <IoPlay className="text-white text-4xl ml-1" />
                </div>
                <span className="text-white text-sm font-medium bg-black/50 px-4 py-1 rounded-full">
                  Play Movie
                </span>
              </button>
            </div>
          </div>
        )}
      </div>

    </section>
  );
}