"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/autoplay";

import { AiFillStar } from "react-icons/ai";
import { FaRegPlayCircle } from "react-icons/fa";
import { BsExclamationCircle } from "react-icons/bs";
import { FaRegBookmark } from "react-icons/fa6";

import { Navigation, Pagination, Autoplay } from "swiper/modules";
import Link from "next/link";
import { useState } from "react";
import TrailerModal from "../modals/TrailerModal";
import useFetch from "@/hooks/useFetch";
import { Movie } from "@/lib/types";
import { HomeSliderSkeleton } from "../skeletons";
import { useDispatch } from "react-redux";
import { IMAGEPOSTER } from "@/constants";
import { addToRecentActivities } from "@/redux/slices/recentActivity";
import { toast } from "react-toastify";

const HomeSlider = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [trailer, setTrailer] = useState("");
  const dispatch = useDispatch();
  const { data: movies, loading } = useFetch<Movie[]>(
    "/api/Movie/random-movie"
  );
  const addToWatchlist = (movie: {
    tmdbId: number;
    title: string;
    posterPath: string;
  }) => {
    toast.success("Added to watchlist", {
      theme: "dark",
    });
    dispatch(
      addToRecentActivities({
        tmdbId: movie.tmdbId,
        movieTitle: movie.title,
        poster_path: movie.posterPath,
        activities: [
          {
            type: "watchlist",
            title: "added to watchlist",
            createdAt: new Date().toISOString(),
          },
        ],
      })
    );
  };

  return (
    <>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={50}
        slidesPerView={1}
        autoplay={{
          delay: 4500,
          disableOnInteraction: false,
        }}
        loop={true}
      >
        {loading && HomeSliderSkeleton()}
        {movies?.map((slid) => {
          return (
            <SwiperSlide key={slid.tmdbId}>
              <div
                className="w-full relative bg-cover bg-center h-[700px]"
                style={{
                  backgroundImage: `url(${IMAGEPOSTER + slid.backdropPath})`,
                }}
              >
                <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[rgba(0,0,0,0.4)] to-black/90 flex items-start md:items-center pt-28 md:pt-64 lg:pt-0">
                  <div className="ml-2 md:ml-12 p-3 md-p-0 flex flex-col gap-3 max-w-xl text-center sm:text-left">
                    <h2 className="text-2xl sm:text-6xl mb-4">{slid.title}</h2>
                    <div className="flex gap-3 justify-center sm:justify-start">
                      <span className="flex basis-auto capitalize items-center bg-primary rounded-xl text-xs font-semibold text-white px-3">
                        {slid.language}
                      </span>
                      <div className="flex basis-auto items-center">
                        <AiFillStar className="text-primary" />
                        <span>{slid.imdbRating.split("/")[0]}</span>
                      </div>
                      <span>{slid.releaseDate}</span>
                    </div>

                    {/* genres */}
                    <div className="flex gap-2 justify-center sm:justify-start">
                      {slid.genresDetails?.map((genre) => (
                        <span
                          key={genre.id}
                          className="flex basis-auto items-center italic text-sm font-semibold text-white"
                        >
                          {genre.name}
                        </span>
                      ))}
                    </div>
                    <p className="text-sm sm:text-lg text-center sm:text-start">
                      {slid.tagline}
                    </p>

                    <div className="flex gap-3 mt-3 justify-center sm:justify-start">
                      <button
                        onClick={() => {
                          setTrailer(slid.trailer);
                          setIsOpen(true);
                        }}
                        aria-label="Watch Trailer"
                        className="bg-primary text-sm p-3 flex items-center gap-1 rounded-3xl text-white transition-all duration-150 border border-transparent hover:border-primary hover:text-white h-[40px]  sm:h-auto"
                      >
                        <FaRegPlayCircle size={16} fill="white" />
                        Watch Trailer
                      </button>

                      <Link
                        href={`/pages/movies/${slid.tmdbId}`}
                        aria-label="More Info"
                        className="border border-primary text-sm p-3 flex items-center gap-1 rounded-3xl text-white transition-all duration-150 hover:bg-primary h-[40px]  sm:h-auto"
                      >
                        <BsExclamationCircle
                          size={18}
                          color="black"
                          fill="white"
                        />
                        More Info
                      </Link>

                      <button
                        onClick={() =>
                          addToWatchlist({
                            tmdbId: slid.tmdbId,
                            title: slid.title,
                            posterPath: slid.posterPath,
                          })
                        }
                        aria-label="Add to Watchlist"
                        className="border border-primary text-sm p-3 hidden sm:flex items-center gap-1 rounded-3xl text-white transition-all duration-150 hover:bg-primary hover:text-white h-[40px]  sm:h-auto"
                      >
                        <FaRegBookmark size={18} color="black" fill="white" />
                        Add to Watchlist
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </SwiperSlide>
          );
        })}
        {isOpen && <TrailerModal setIsOpen={setIsOpen} trailer={trailer} />}
      </Swiper>
    </>
  );
};

export default HomeSlider;
