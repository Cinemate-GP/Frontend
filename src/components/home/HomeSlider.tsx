"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";
import "swiper/css/effect-fade";

import { AiFillStar } from "react-icons/ai";
import { FaRegPlayCircle } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";

import { Navigation, Pagination, Autoplay, EffectFade, Parallax } from "swiper/modules";
import Link from "next/link";
import { useState } from "react";
import TrailerModal from "../modals/TrailerModal";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import { HomeSliderSkeleton } from "../skeletons";
import { IMAGEPOSTER } from "@/constants";
import Image from "next/image";
import { motion } from "framer-motion";

const HomeSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trailer, setTrailer] = useState("");
  const { data: movies, loading } = useFetch<Movie[]>(
    "/api/Movie/trending",
  );
  return (
    <>
      <div className="relative">
        <Swiper
          modules={[Navigation, Pagination, Autoplay, EffectFade, Parallax]}
          slidesPerView={1}
          effect="fade"
          parallax={true}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
          }}          speed={1500}          loop={true}
          className="hero-slider h-screen"
        >
          {loading && HomeSliderSkeleton()}
          {movies?.map((slid, index) => {
            return (
              <SwiperSlide key={slid.tmdbId}>
                <div className="relative w-full h-screen overflow-hidden">
                  {/* Background Image with Parallax */}
                  <div
                    className="absolute inset-0 w-full h-full bg-cover bg-center scale-110 transition-transform duration-[6000ms] ease-out"
                    style={{
                      backgroundImage: `url(${IMAGEPOSTER + slid.backdropPath})`,
                    }}
                    data-swiper-parallax="-300"
                  />
                  
                  {/* Enhanced Gradient Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/30" />
                    {/* Animated Content */}
                  <div className="absolute inset-0 flex items-center pb-20">
                    <div className="container mx-auto px-4 sm:px-6 md:px-8 lg:px-12">
                      <motion.div 
                        initial={{ opacity: 0, y: 100 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 1, delay: index * 0.2 }}
                        className="flex flex-col gap-6 w-full max-w-2xl text-center sm:text-left"
                        data-swiper-parallax="-200"
                      >
                        {/* Movie Logo/Title */}
                        {slid?.logoPath ? (
                          <motion.div 
                            initial={{ opacity: 0, scale: 0.8 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="w-full max-w-[350px] md:max-w-[450px] mx-auto sm:mx-0 mb-4"
                          >
                            <Image 
                              width={450}
                              height={225}
                              src={IMAGEPOSTER + slid.logoPath}
                              alt={slid.title || "Movie logo"}
                              className="w-full h-auto object-contain drop-shadow-2xl"
                              priority
                            />
                          </motion.div>
                        ) : (
                          <motion.h1 
                            initial={{ opacity: 0, x: -50 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8, delay: 0.3 }}
                            className="text-4xl sm:text-6xl lg:text-7xl font-bold bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent drop-shadow-2xl"
                          >
                            {slid.title}
                          </motion.h1>
                        )}

                        {/* Movie Info */}
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.5 }}
                          className="flex flex-wrap gap-4 justify-center sm:justify-start items-center"
                        >
                          <span className="bg-primary/90 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-semibold capitalize border border-primary/20">
                            {slid.language}
                          </span>
                          <div className="flex items-center gap-2 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                            <AiFillStar className="text-primary text-lg" />
                            <span className="text-white font-semibold">{slid.imdbRating.split("/")[0]}</span>
                          </div>
                          <span className="text-white/90 bg-black/30 backdrop-blur-sm px-4 py-2 rounded-full border border-white/10">
                            {slid.releaseDate}
                          </span>
                        </motion.div>

                        {/* Genres */}
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.6 }}
                          className="flex flex-wrap gap-2 justify-center sm:justify-start"
                        >
                          {slid.genresDetails?.slice(0, 4).map((genre) => (
                            <span
                              key={genre.id}
                              className="text-white/80 bg-white/10 backdrop-blur-sm px-3 py-1 rounded-full text-sm border border-white/20 hover:bg-primary/20 transition-colors duration-300"
                            >
                              {genre.name}
                            </span>
                          ))}
                        </motion.div>

                        {/* Tagline */}
                        <motion.p 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.7 }}
                          className="text-lg sm:text-xl text-white/90 leading-relaxed drop-shadow-lg max-w-xl"
                        >
                          {slid.tagline}
                        </motion.p>                        {/* Action Buttons */}
                        <motion.div 
                          initial={{ opacity: 0, y: 30 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.6, delay: 0.8 }}
                          className="flex flex-wrap gap-4 justify-center sm:justify-start"
                        >
                          <button
                            onClick={() => {
                              setTrailer(slid.trailer);
                              setIsOpen(true);
                            }}
                            className="bg-primary hover:bg-primary/80 text-white px-8 py-3 rounded-lg flex items-center gap-3 font-medium text-base shadow-lg hover:shadow-xl transition-all duration-200 transform hover:-translate-y-1"
                          >
                            <FaRegPlayCircle size={20} />
                            Watch Trailer
                          </button>

                          <Link
                            href={`/movies/${slid.tmdbId}`}
                            className="bg-white/10 hover:bg-white/20 text-white border border-white/20 hover:border-white/40 px-8 py-3 rounded-lg flex items-center gap-3 font-medium text-base backdrop-blur-sm transition-all duration-200 transform hover:-translate-y-1"
                          >
                            <BsExclamationCircle size={20} />
                            More Info
                          </Link>
                        </motion.div>                      </motion.div>
                    </div>
                  </div>
                </div>
              </SwiperSlide>
            );
          })}        </Swiper>
      </div>
      
      {isOpen && <TrailerModal setIsOpen={setIsOpen} trailer={trailer} />}
    </>
  );
};

export default HomeSlider;
