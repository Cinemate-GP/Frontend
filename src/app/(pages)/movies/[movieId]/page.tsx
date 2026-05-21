"use client";
import React from "react";
import MovieStreaming from "@/components/movies/MovieStream";
import Actors from "@/components/movies/Actors";
import Reviews from "@/components/movies/Reviews";
import SimilarMovies from "@/components/movies/SimilarMovies";
import "react-toastify/dist/ReactToastify.css";
import MovieInfo from "@/components/movies/MovieInfo";
import { ToastContainer } from "react-toastify";
import { usePathname, useRouter } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import { getCookie } from "@/lib/utils";
interface MovieDetails extends Movie {
  isLiked: boolean;
  isWatched: boolean;
  isInWatchList: boolean;
  stars: number;
}

const MovieDetails = () => {
  const pathname = usePathname();
  const router = useRouter();
  const tmdbid = pathname.split("/")[2];
  const { data, loading, error } = useFetch<MovieDetails>(`/api/Movie/` + tmdbid);

  if (!loading && error && !getCookie("token")) {
    return (
      <div className="min-h-screen bg-mainBg flex flex-col items-center justify-center gap-6 px-4">
        <div className="text-center max-w-md">
          <h2 className="text-2xl font-bold text-foreground mb-2">Sign in to view movie details</h2>
          <p className="text-textMuted mb-6">Create an account or sign in to explore full movie details, ratings, and more.</p>
          <div className="flex gap-3 justify-center">
            <button onClick={() => router.push("/login")} className="px-6 py-2.5 bg-primary hover:bg-primary/90 text-white rounded-lg font-medium transition-colors">Sign In</button>
            <button onClick={() => router.push("/signup")} className="px-6 py-2.5 border border-border hover:bg-hoverBg text-foreground rounded-lg font-medium transition-colors">Sign Up</button>
          </div>
        </div>
      </div>
    );
  }
  const info = {
    tmdbId: data?.tmdbId,
    title: data?.title,
    tagline: data?.tagline,
    releaseDate: data?.releaseDate,
    posterPath: data?.posterPath,
    logoPath: data?.logoPath,
    imdbRating: data?.imdbRating,
    rottenTomatoesRating: data?.rottenTomatoesRating,
    metacriticRating: data?.metacriticRating,
    mpa: data?.mpa,
    backdropPath: data?.backdropPath,
    runtime: data?.runtime,
    overview: data?.overview,
    geners: data?.genresDetails,
    movieReviews: data?.movieReviews,
    stars: data?.stars,
    isLiked: data?.isLiked,
    isWatched: data?.isWatched,
    isInWatchList: data?.isInWatchList,
    trailer: data?.trailer,
    streamingLink: data?.tmdbId.toString(),
  };
  return (
    <div className="min-h-screen bg-mainBg">
      {/* Movie Info - Full width background section */}
      <MovieInfo info={info!} loading={loading}/>
      
      {/* Container for all other sections with proper margins and padding */}
      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20">
        {/* Movie Streaming */}
        <section className="mb-16 sm:mb-20">
          <MovieStreaming image={data?.backdropPath} loading={loading} id={data?.tmdbId.toString()} />
        </section>
        
        {/* Actors */}
        <section className="mb-16 sm:mb-20">
          <Actors actors={data?.actors} loading={loading}/>
        </section>
        
        {/* Reviews */}
        <section className="mb-16 sm:mb-20">
          <Reviews movieReviews={data?.movieReviews}/>
        </section>
        
        {/* Similar Movies */}
        <section className="mb-16 sm:mb-20">
          {info?.tmdbId ? <SimilarMovies tmdbId={info.tmdbId}/> : null}
        </section>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
