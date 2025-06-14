"use client";
import React from "react";
import MovieStreaming from "@/components/movies/MovieStream";
import Actors from "@/components/movies/Actors";
import Reviews from "@/components/movies/Reviews";
import SimilarMovies from "@/components/movies/SimilarMovies";
import "react-toastify/dist/ReactToastify.css";
import MovieInfo from "@/components/movies/MovieInfo";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
interface MovieDetails extends Movie {
  isLiked: boolean;
  isWatched: boolean;
  isInWatchList: boolean;
  stars: number;
}

const MovieDetails = () => {
  const pathname = usePathname();
  const tmdbid = pathname.split("/")[2];
  const { data,loading } = useFetch<MovieDetails>(`/api/Movie/` + tmdbid);
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
          <SimilarMovies />
        </section>
      </div>
      
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
