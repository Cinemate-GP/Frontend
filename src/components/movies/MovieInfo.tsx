/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @next/next/no-img-element */
"use client";
import React, { useEffect, useState } from "react";
import { LuCalendarClock } from "react-icons/lu";
import { GoStarFill } from "react-icons/go";
import { FiHeart } from "react-icons/fi";
import { FiPlus } from "react-icons/fi";
import { FaHeart } from "react-icons/fa";
import { toast } from "react-toastify";
import { IMAGEPOSTER } from "@/constants";
import { formatDuration } from "@/lib/utils";
import { SkeletonMovieInfo } from "@/components/skeletons";
import { useDispatch, useSelector } from "react-redux";
import { addMovieToWatchlist } from "@/redux/slices/watchlist";
import { RootState } from "@/redux/store";
import { addToLikedMovies, removeMovieFromLiked } from "@/redux/slices/liked";
import { addToRecentActivities } from "@/redux/slices/recentActivity";

type Props = {
  movieId: number | undefined;
  tmdbId: number | undefined;
  id: number | undefined;
  title: string | undefined;
  overview: string | undefined;
  time: number | undefined;
  date: string | undefined;
  poster_path: string | undefined;
  geners: {
    id:number,
    name:string
  }[] | undefined;
};

const MovieInfo = ({ info, loading }: { info: Props; loading: boolean }) => {
  const [liked, setLiked] = useState<boolean | null>(null);
  const { watchlist } = useSelector((state: RootState) => state.watchlist);

  const dispatch = useDispatch();
  const toggleLike = () => {
    setLiked((prev) => !prev);
  };

  useEffect(() => {
    if (liked !== null) {
      if (liked) {
        dispatch(
          addToLikedMovies({
            tmdbId: info.tmdbId,
            title: info.title,
            poster_path: info.poster_path,
          })
        );
        dispatch(
          addToRecentActivities({
            tmdbId: info.tmdbId,
            title: "added to liked",
            movieTitle: info.title,
            poster_path: info.poster_path,
            type: "liked",
            createdAt: new Date().toISOString(),
          })
        );
      } else {
        dispatch(removeMovieFromLiked(info.tmdbId));
      }
    }
  }, [liked]);

  const addToWatchlist = () => {
    const isExistMovie = watchlist?.find(
      (movie) => movie.tmdbId === info.tmdbId
    );
    if (!isExistMovie) {
      toast.success("Added to watchlist successfully!", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      dispatch(
        addMovieToWatchlist({
          tmdbId: info.tmdbId,
          title: info.title,
          poster_path: info.poster_path,
        })
      );
    } else {
      toast.warning("Already in your watchlist", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
    }
    dispatch(
      addToRecentActivities({
        tmdbId: info.tmdbId,
        title: "added To watchlist",
        movieTitle: info.title,
        poster_path: info.poster_path,
        type: "watchlist",
        createdAt: new Date().toISOString(),
      })
    );
  };

  if (loading) return <SkeletonMovieInfo />;
  return (
    <div
      className={`relative w-full h-screen bg-cover bg-top`}
      style={{
        backgroundImage: `url(${IMAGEPOSTER + info.poster_path})`,
      }}
    >
      <div className="absolute w-full inset-0 bg-gradient-to-t from-black/80 via-black/80 via-10% to-black/40">
        <div className="absolute w-full flex justify-around items-center top-[50%] translate-y-[-50%] mx-0 xl:mx-[4rem] p-5">
          <img
            src={IMAGEPOSTER + info.poster_path}
            alt={info.title || "image-poster"}
            className="rounded-lg hidden lg:block w-[300px] h-[350px] object-cover"
          />
          <div className="flex flex-col items-center text-center gap-5 max-w-full">
            <h2 className="tracking-widest text-4xl xl:text-5xl font-bold">
              {info.title}
            </h2>
            <div className="flex gap-4 text-lg">
              <span className="flex items-center gap-1">
                <LuCalendarClock />
                {info.date}
              </span>
              <span className="flex items-center gap-1">
                <GoStarFill color="gold" />
                3.5
              </span>
              <span>{formatDuration(info.time)}</span>
            </div>
            <ul className="flex gap-2 items-center flex-wrap">
              {info.geners?.map((gen) => (
                <li
                  key={gen.id}
                  className="bg-[#AE251C] text-white px-3 py-1 italic rounded-md"
                >
                  {gen.name}
                </li>
              ))}
            </ul>
            <p className="w-full md:max-w-[60%]">{info.overview}</p>
            <div className="flex items-center gap-3">
              <button
                className="flex gap-2 items-center bg-transparent border border-white text-white px-4 py-2 rounded-3xl transition-all duration-300 hover:border-primary hover:text-primary"
                onClick={toggleLike}
              >
                {liked ? (
                  <FaHeart color="red" className="animate-heart" />
                ) : (
                  <FiHeart className={`${!liked ? "animate-heart" : ""}`} />
                )}
                Like
              </button>
              <button
                className="flex gap-2 items-center bg-transparent  border border-white text-white px-4 py-2 rounded-3xl transition-all duration-300 hover:border-primary hover:text-primary"
                onClick={addToWatchlist}
              >
                <FiPlus />
                Add To Watchlist
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MovieInfo;
