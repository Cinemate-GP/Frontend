/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import MovieCard from "../MovieCard";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IMAGEPOSTER } from "@/constants";
import { ActorMoviesSkeleton } from "../skeletons";
import { Actor } from "@/lib/types";
import { truncateText } from "@/lib/utils";

export default function SingleActor() {
  const pathname = usePathname();
  const actorId = pathname.split("/")[3];
  const [loading, setLoading] = useState<boolean>(true);
  const [actorData, setActorData] = useState<Actor | null>(null);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(`/api/Actor/${actorId}`);
        if (!response.ok) throw new Error("Failed to fetch data");
        const json = await response.json();
        setActorData(json);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [actorId]);

  return (
    <>
      {/* for desktop */}
      {loading ? (
        <ActorMoviesSkeleton />
      ) : (
        <>
          <div className="hidden sm:flex h-screen gap-4 bg-black text-white">
            {/* Left section (Movies Grid) */}
            <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3 p-[2rem] overflow-y-auto custom-scrollbar">
              {actorData?.movies.map((movie) => (
                <MovieCard
                  key={movie.tmdbId}
                  tmdbid={movie.tmdbId}
                  imdbRating={movie.imdbRating}
                  title={movie.title}
                  image={IMAGEPOSTER + movie.posterPath}
                />
              ))}
            </div>

            {/* Right section (Actor Profile) */}
            <aside className="w-80 p-4 flex flex-col items-center space-y-4 sticky top-0">
              <img
                src={IMAGEPOSTER + actorData?.profilePath}
                alt="Chris Pratt"
                width={400}
                height={500}
                className={`w-80 h-68 rounded-lg object-cover transition-opacity duration-500`}
                loading="lazy"
              />
              <h3>{actorData?.name}</h3>
              <p className="text-gray-400 text-sm mt-1 overflow-auto custom-scrollbar">
                {truncateText(
                  actorData!.biography.slice(0, 400),
                  isExpanded,
                  200
                )}{" "}
                <button
                  className="font-bold text-white"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? " Show Less" : " Show More"}
                </button>
              </p>
            </aside>
          </div>

          {/* for mobile */}
          <div className="h-screen bg-black text-white sm:hidden flex flex-col">
            {/* Actor Info Section */}
            <div className="flex flex-col items-center p-4 sticky">
              <Image
                src={
                  actorData?.profilePath
                    ? IMAGEPOSTER + actorData?.profilePath
                    : "/ueser-placeholder.jpg"
                }
                alt="Chris Pratt"
                width={120}
                height={120}
                className="w-32 h-32 rounded-full object-cover"
              />
              <h2 className="mt-2 text-lg font-bold">Chris Pratt</h2>
              <p className="text-gray-400 text-sm mt-1 overflow-auto">
                {truncateText(
                  actorData!.biography.slice(0, 400),
                  isExpanded,
                  200
                )}{" "}
                <button
                  className="font-bold text-white"
                  onClick={() => setIsExpanded(!isExpanded)}
                >
                  {isExpanded ? " Show Less" : " Show More"}
                </button>
              </p>
            </div>

            {/* Scrollable Movies Section */}
            <div className="grid grid-cols-3 gap-4 overflow-y-auto custom-scrollbar p-4">
              {actorData?.movies.map((movie) => (
                <div key={movie.title} className="">
                  <MovieCard
                    key={movie.tmdbId}
                    tmdbid={movie.tmdbId}
                    imdbRating={movie.imdbRating}
                    title={movie.title}
                    image={`https://image.tmdb.org/t/p/original//${movie.posterPath}`}
                  />
                </div>
              ))}
            </div>
          </div>
        </>
      )}
    </>
  );
}
