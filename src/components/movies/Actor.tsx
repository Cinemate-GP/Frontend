/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import MovieCard from "../MovieCard";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { IMAGEPOSTER } from "@/constants";
import { ActorMoviesSkeleton } from "../skeletons";
export default function SingleActor() {
  type Actor = {
    id: number;
    name: string;
    profilePath: string;
    movies: {
      id: number;
      movieId: number;
      tmdbId: number;
      title: string;
      poster_path: string;
    }[];
  };
  const pathname = usePathname();
  const actorId = pathname.split("/")[3];
  const [loading, setLoading] = useState<boolean>(true);
  const [actorData, setActorData] = useState<Actor | null>(null);
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
                  key={movie.movieId}
                  tmdbid={movie.tmdbId}
                  title={movie.title}
                  image={IMAGEPOSTER + movie.poster_path}
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
              <p className="text-sm text-gray-300">
                Christopher Michael Pratt (born 21 June 1979) is an American
                actor,known for starring in both television and action films. He
                rose to prominence for his television roles, particularly in the
                NBC sitcom…
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
              <p className="text-sm text-gray-300 text-center px-4">
                Christopher Michael Pratt (born 21 June 1979) is an American
                actor, known for starring in both television and action films...
              </p>
            </div>

            {/* Scrollable Movies Section */}
            <div className="grid grid-cols-3 gap-4 overflow-y-auto custom-scrollbar p-4">
              {actorData?.movies.map((movie) => (
                <div key={movie.title} className="">
                  <MovieCard
                    key={movie.movieId}
                    tmdbid={movie.tmdbId}
                    title={movie.title}
                    image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
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
