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
    <div>
      {/* Movie Info */}
      <MovieInfo info={info!} loading={loading}/>
      {/* Movie Streaming */}
      <MovieStreaming image={data?.backdropPath} loading={loading} id={data?.tmdbId.toString()} />
      {/*Actors*/}
      <Actors actors={data?.actors} loading={loading}/>
      {/*Reviews*/}
      <Reviews movieReviews={data?.movieReviews}/>
      {/*Similar Movies*/}
      <SimilarMovies />
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
