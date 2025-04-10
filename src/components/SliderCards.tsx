"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import MovieCard from "./MovieCard";
import { CardSkeleton } from "./skeletons";
interface SliderProps {
  movieList:
    {
        id?: number;
        movieId: number;
        tmdbId: number;
        title: string;
        poster_path: string;
      }[]
    | null;
  sliderType: string;
  loading: boolean;
}

export default function MovieSlider(props: SliderProps) {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      slidesPerView={1}
      spaceBetween={props.sliderType === "top10" ? 70 : 20}
      navigation
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      breakpoints={{
        640: { slidesPerView: 2 },
        768: { slidesPerView: 3 },
        1024: { slidesPerView: 4 },
        1200: { slidesPerView: 4 },
      }}
      className={`movie-slider`}
    >
      {props.loading ? (
        <CardSkeleton />
      ) : (
        <>
          {props.movieList?.map((movie, i) => (
            <SwiperSlide key={movie.tmdbId} className="movie-slider">
              <MovieCard
                id={i+1}
                tmdbid={movie.tmdbId}
                title={movie.title}
                image={`https://image.tmdb.org/t/p/original//${movie.poster_path}`}
                cardType={props.sliderType}
              />
            </SwiperSlide>
          ))}
        </>
      )}
    </Swiper>
  );
}
