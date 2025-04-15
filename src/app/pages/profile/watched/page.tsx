"use client";
import MovieCard from "@/components/MovieCard";
import SectionTitle from "@/components/SectionTitle";
import { CardSkeleton } from "@/components/skeletons";
import { IMAGEPOSTER } from "@/constants";
import { useEffect, useState } from "react";

interface Watched {
  movieId: number;
  poster_path: number;
  title: string;
  tmdbId: number;
}
const Watched = () => {
  const [watchedMovies, setWatchedMovies] = useState<Watched[] | null>(null);
  const [loading, setLoading] = useState(false);
  const token = document.cookie.split("=")[1];
  useEffect(() => {
    (async function () {
      try {
        setLoading(true);
        const res = await fetch("/api/Profile/WatchedMovies", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        if (!res.ok) throw new Error("Failed to fetch data");
        const json = await res.json();
        setWatchedMovies(json);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    })();
  }, [token]);

  return (
    <div className="mt-5">
      <SectionTitle title="Watched Movies" />
      {loading && <CardSkeleton />}
      {watchedMovies?.length === 0 && <p>There is no Watched Movies yet</p>}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 p-6 rounded-lg">
        {watchedMovies?.map((movie) => (
          <MovieCard
            key={movie.tmdbId}
            tmdbid={movie.tmdbId}
            title={movie.title}
            image={`${IMAGEPOSTER}${movie.poster_path}`}
          />
        ))}
      </div>
    </div>
  );
};

export default Watched;
