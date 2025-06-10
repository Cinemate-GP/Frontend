"use client";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, EffectCoverflow } from "swiper/modules";
import type { SwiperRef } from "swiper/react";
import type { Swiper as SwiperType } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/effect-coverflow";
import MovieCard from "./MovieCard";
import { CardSkeleton } from "./skeletons";
import { motion } from "framer-motion";
import { useRef, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

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
  const swiperRef = useRef<SwiperRef>(null);
  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);
  
  const handlePrev = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slidePrev();
    }
  };

  const handleNext = () => {
    if (swiperRef.current?.swiper) {
      swiperRef.current.swiper.slideNext();
    }
  };

  const handleSlideChange = (swiper: SwiperType) => {
    setIsBeginning(swiper.isBeginning);
    setIsEnd(swiper.isEnd);
  };
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6, delay: 0.2 }}
      className="relative group"
    >
      <Swiper
        ref={swiperRef}
        modules={[Navigation, Pagination, Autoplay, EffectCoverflow]}
        slidesPerView={1}
        spaceBetween={24}
        autoplay={{ 
          delay: 4000, 
          disableOnInteraction: false,
          pauseOnMouseEnter: true 
        }}
        speed={800}
        onSlideChange={handleSlideChange}
        onSwiper={handleSlideChange}
        breakpoints={{
          640: { 
            slidesPerView: 2,
            spaceBetween: 20 
          },
          768: { 
            slidesPerView: 3,
            spaceBetween: 24 
          },
          1024: { 
            slidesPerView: 4,
            spaceBetween: 28 
          },
          1200: { 
            slidesPerView: isTop10 ? 4 : 5,
            spaceBetween: 32 
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
                    id={isTop10 ? undefined : i+1}
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
        {/* Custom Navigation Buttons - Only show when there are slides to navigate */}
      {props.movieList && props.movieList.length > 0 && (
        <>
          {/* Previous Button - Only show when not at beginning */}
          {!isBeginning && (
            <motion.button
              onClick={handlePrev}
              className="absolute left-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 
                bg-black/70 hover:bg-primary/90 backdrop-blur-sm
                border border-white/20 rounded-full text-white
                flex items-center justify-center shadow-xl
                transition-all duration-300 ease-out
                opacity-0 group-hover:opacity-100 
                -translate-x-2 group-hover:translate-x-0
                hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 0, x: -8 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              aria-label="Previous slide"
            >
              <FiChevronLeft size={20} />
            </motion.button>
          )}

          {/* Next Button - Only show when not at end */}
          {!isEnd && (
            <motion.button
              onClick={handleNext}
              className="absolute right-0 top-1/2 -translate-y-1/2 z-10 w-12 h-12 
                bg-black/70 hover:bg-primary/90 backdrop-blur-sm
                border border-white/20 rounded-full text-white
                flex items-center justify-center shadow-xl
                transition-all duration-300 ease-out
                opacity-0 group-hover:opacity-100 
                translate-x-2 group-hover:translate-x-0
                hover:scale-110"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 0, x: 8 }}
              whileInView={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              aria-label="Next slide"
            >
              <FiChevronRight size={20} />
            </motion.button>
          )}
        </>
      )}
    </motion.div>
  );
}
