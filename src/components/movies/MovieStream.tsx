/* eslint-disable @next/next/no-img-element */
"use client";
import { useState } from "react";
import { IoPlay } from "react-icons/io5";
import { IMAGEPOSTER } from "@/constants";
import { SkeletonMovieStreaming } from "../skeletons";

type Props = {
  image?: string;
  loading: boolean;
  id?: string;
};

export default function MovieStreaming({ image, loading, id }: Props) {
  const [playing, setPlaying] = useState(false);

  if (loading) return <SkeletonMovieStreaming />;
  return (
    <section className="relative w-full bg-secondaryBg backdrop-blur-xl rounded-2xl shadow-2xl overflow-hidden p-6">
      <div style={{ position: "relative", paddingBottom: "56.25%", height: 0 }}>
        {playing ? (
          <iframe
            src={`https://player.videasy.net/movie/${id}`}
            style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
            allowFullScreen
            allow="encrypted-media"
            title="Movie Player"
          />
        ) : (
          <div
            className="absolute inset-0 group cursor-pointer rounded-xl overflow-hidden"
            onClick={() => setPlaying(true)}
          >
            <img
              src={image ? IMAGEPOSTER + image : "/image-placeholder.png"}
              alt="Movie Thumbnail"
              className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
            />
            <div className="absolute inset-0 bg-black/40 group-hover:bg-black/50 transition" />
            <div className="absolute inset-0 flex flex-col items-center justify-center">
              <div className="flex flex-col items-center gap-3">
                <div className="bg-primary w-20 h-20 rounded-full flex items-center justify-center hover:scale-110 transition-transform">
                  <IoPlay className="text-white text-4xl ml-1" />
                </div>
                <span className="text-white text-sm font-medium bg-black/50 px-4 py-1 rounded-full">
                  Play Movie
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}