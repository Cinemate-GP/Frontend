"use client";
import React from "react";
import Trailer from "@/components/movies/Trailer";
import Actors from "@/components/movies/Actors";
import Reviews from "@/components/movies/Reviews";
import SimilarMovies from "@/components/movies/SimilarMovies";
import "react-toastify/dist/ReactToastify.css";
import MovieInfo from "@/components/movies/MovieInfo";
import { ToastContainer } from "react-toastify";
import { usePathname } from "next/navigation";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";

const MovieDetails = () => {
  const pathname = usePathname();
  const tmdbid = pathname.split("/")[3];
  const { data,loading } = useFetch<Movie>(`/api/Movie/` + tmdbid);
  const info = {
    tmdbId: data?.tmdbId,
    id: data?.tmdbId,
    title: data?.title,
    tagline: data?.tagline,
    posterPath: data?.posterPath,
    imdbRating: data?.imdbRating,
    rottenTomatoesRating: data?.rottenTomatoesRating,
    metacriticRating: data?.metacriticRating,
    mpa: data?.mpa,
    backdropPath: data?.backdropPath,
    date: data?.releaseDate,
    time: data?.runtime,
    overview: data?.overview,
    geners: data?.genresDetails,
  };

  return (
    <div>
      {/* Movie Info */}
      
      <MovieInfo info={info!} loading={loading}/>
      {/* Trailer */}
      <Trailer trailer={data?.trailer} image={data?.backdropPath} loading={loading} />
      {/*Actors*/}
      <Actors actors={data?.actors} loading={loading}/>
      {/*Reviews*/}
      <Reviews />
      {/*Similar Movies*/}
      <SimilarMovies />
      <ToastContainer />
    </div>
  );
};

export default MovieDetails;
