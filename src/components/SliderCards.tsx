"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import MovieCard from "./MovieCard";
import { CardSkeleton } from "./skeletons";
import { motion } from "framer-motion";

interface SliderProps {
  movieList:
    {
        id?: number;
        imdbRating: string;
        tmdbId: number;
        title: string;
        posterPath: string;
      }[]
    | null;
  sliderType: string;
  loading: boolean;
}

export default function MovieSlider(props: SliderProps) {
  const isTop10 = props.sliderType === "top10";
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative"
    >
      <Swiper
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        slidesPerView={1}
        spaceBetween={isTop10 ? 40 : 24}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{ 
          delay: 4000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        speed={800}
        breakpoints={{
          640: { 
            slidesPerView: 2,
            spaceBetween: isTop10 ? 50 : 20 
          },
          768: { 
            slidesPerView: 3,
            spaceBetween: isTop10 ? 60 : 24 
          },
          1024: { 
            slidesPerView: 4,
            spaceBetween: isTop10 ? 70 : 28 
          },
          1200: { 
            slidesPerView: isTop10 ? 4 : 5,
            spaceBetween: isTop10 ? 80 : 32 
          },
        }}
        className="movie-slider-modern !pb-12"
      >
        {props.loading ? (
          <CardSkeleton />
        ) : (
          <>
            {props.movieList?.map((movie, i) => (
              <SwiperSlide key={movie.tmdbId} className="movie-slide-modern">
                <motion.div
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  whileInView={{ opacity: 1, y: 0, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ 
                    duration: 0.6, 
                    delay: i * 0.1,
                    ease: "easeOut" 
                  }}
                  whileHover={{ 
                    y: -8, 
                    transition: { duration: 0.3 } 
                  }}
                  className="h-full"
                >
                  <MovieCard
                    id={i+1}
                    tmdbid={movie.tmdbId}
                    title={movie.title}
                    image={`https://image.tmdb.org/t/p/original//${movie.posterPath}`}
                    cardType={isTop10 ? "top10" : "default"}
                    imdbRating={movie.imdbRating}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </>
        )}
      </Swiper>
      
      {/* Custom Navigation Buttons */}
      <div className="swiper-button-prev !w-12 !h-12 !bg-black/50 !backdrop-blur-sm !border !border-white/20 !rounded-full !text-white hover:!bg-primary/80 !transition-all !duration-300 after:!text-sm after:!font-bold !shadow-xl" />
      <div className="swiper-button-next !w-12 !h-12 !bg-black/50 !backdrop-blur-sm !border !border-white/20 !rounded-full !text-white hover:!bg-primary/80 !transition-all !duration-300 after:!text-sm after:!font-bold !shadow-xl" />
    </motion.div>
  );
}
