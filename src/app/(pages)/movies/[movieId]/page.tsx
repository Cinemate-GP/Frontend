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
import { getCookie } from "@/lib/utils";

interface PersonalizedData {
  isLiked: boolean;
  isWatched: boolean;
  isInWatchList: boolean;
  stars: number;
}

interface MovieDetails extends Movie, PersonalizedData {}

const MovieDetailsPage = () => {
  const pathname = usePathname();
  const tmdbid = pathname.split("/")[2];
  const isLoggedIn = !!getCookie("token");

  // Basic movie info — public, no auth required
  const { data: movieData, loading: movieLoading } = useFetch<Movie>(`/api/Movie/` + tmdbid);

  // Personalized data — only fetched when logged in
  const { data: personalData, loading: personalLoading } = useFetch<MovieDetails>(
    isLoggedIn ? `/api/Movie/` + tmdbid : null
  );

  const loading = isLoggedIn ? personalLoading : movieLoading;
  const data = personalData ?? movieData;

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
    stars: personalData?.stars,
    isLiked: personalData?.isLiked,
    isWatched: personalData?.isWatched,
    isInWatchList: personalData?.isInWatchList,
    trailer: data?.trailer,
    streamingLink: data?.tmdbId?.toString(),
  };

  return (
    <div className="min-h-screen bg-mainBg">
      <MovieInfo info={info!} loading={loading} />

      <div className="container mx-auto px-4 sm:px-6 md:px-8 pt-8 pb-20">
        <section className="mb-16 sm:mb-20">
          <MovieStreaming image={data?.backdropPath} loading={loading} id={data?.tmdbId?.toString()} />
        </section>

        <section className="mb-16 sm:mb-20">
          <Actors actors={data?.actors} loading={loading} />
        </section>

        <section className="mb-16 sm:mb-20">
          <Reviews movieReviews={data?.movieReviews} />
        </section>

        <section className="mb-16 sm:mb-20">
          {info?.tmdbId ? <SimilarMovies tmdbId={info.tmdbId} /> : null}
        </section>
      </div>

      <ToastContainer />
    </div>
  );
};

export default MovieDetailsPage;
