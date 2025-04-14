"use client";
import React, { useEffect, useState, useCallback } from "react";
import { LuCalendarClock } from "react-icons/lu";
import { GoStarFill } from "react-icons/go";
import { FiHeart, FiPlus } from "react-icons/fi";
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
import { FaRegEye, FaRegStar } from "react-icons/fa6";
import RatingModal from "../modals/RatingModal";

interface MovieInfoProps {
  info: {
    movieId?: number;
    tmdbId?: number;
    id?: number;
    title?: string;
    overview?: string;
    time?: number;
    date?: string;
    poster_path?: string;
    genres?: { id: number; name: string }[];
  };
  loading: boolean;
}

const MovieInfo: React.FC<MovieInfoProps> = ({ info, loading }) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [liked, setLiked] = useState<boolean>(false);
  const [backdropImage, setBackdropImage] = useState<string | null>(null);
  const { watchlist } = useSelector((state: RootState) => state.watchlist);
  const dispatch = useDispatch();

  const fetchBackdropImage = useCallback(async (id: number) => {
    try {
      const res = await fetch(
        `https://api.themoviedb.org/3/movie/${id}?api_key=196fb13a1f9bda525f29ed4e3543de8c`
      );
      if (!res.ok) throw new Error("Failed to fetch backdrop image");
      const data = await res.json();
      return data.backdrop_path
        ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
        : null;
    } catch (error) {
      console.error("Error fetching backdrop image:", error);
      return null;
    }
  }, []);

  useEffect(() => {
    if (info.id && !backdropImage) {
      fetchBackdropImage(info.id).then(setBackdropImage);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [info.id, backdropImage]);

  useEffect(() => {
    if (liked && info.tmdbId) {
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
    } else if (!liked && info.tmdbId) {
      dispatch(removeMovieFromLiked(info.tmdbId));
    }
  }, [liked, info.tmdbId, info.title, info.poster_path, dispatch]);

  const handleToggleLike = () => setLiked((prev) => !prev);

  const handleAddToWatchlist = useCallback(() => {
    if (!info.tmdbId) return;

    const isInWatchlist = watchlist?.some(
      (movie) => movie.tmdbId === info.tmdbId
    );

    if (isInWatchlist) {
      toast.warning("Already in your watchlist", {
        position: "bottom-right",
        autoClose: 2000,
        theme: "dark",
      });
      return;
    }

    dispatch(
      addMovieToWatchlist({
        tmdbId: info.tmdbId,
        title: info.title,
        poster_path: info.poster_path,
      })
    );

    dispatch(
      addToRecentActivities({
        tmdbId: info.tmdbId,
        title: "added to watchlist",
        movieTitle: info.title,
        poster_path: info.poster_path,
        type: "watchlist",
        createdAt: new Date().toISOString(),
      })
    );

    toast.success("Added to watchlist successfully!", {
      position: "bottom-right",
      autoClose: 2000,
      theme: "dark",
    });
  }, [dispatch, info.tmdbId, info.title, info.poster_path, watchlist]);

  if (loading) return <SkeletonMovieInfo />;

  const backgroundImage =
    backdropImage ||
    (info.poster_path ? `${IMAGEPOSTER}${info.poster_path}` : "");

  return (
    <div
      className="relative w-full h-screen bg-cover bg-top"
      style={{
        backgroundImage: backgroundImage
          ? `url(${backgroundImage})`
          : undefined,
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/80 via-10% to-black/40">
        <div className="absolute w-full flex flex-col lg:flex-row justify-around items-center top-[50%] -translate-y-1/2 px-5 xl:px-16">
          {info.poster_path && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={`${IMAGEPOSTER}${info.poster_path}`}
              alt={info.title || "Movie poster"}
              className="rounded-lg hidden lg:block w-[300px] h-[450px] object-cover"
            />
          )}
          <div className="flex flex-col items-center text-center gap-6 max-w-3xl">
            <h2 className="tracking-widest text-4xl xl:text-5xl font-bold">
              {info.title || "Untitled"}
            </h2>
            <div className="flex flex-wrap justify-center gap-4 text-lg">
              {info.date && (
                <span className="flex items-center gap-1">
                  <LuCalendarClock />
                  {info.date}
                </span>
              )}
              <span className="flex items-center gap-1">
                <GoStarFill color="gold" />
                3.5
              </span>
              {info.time && <span>{formatDuration(info.time)}</span>}
            </div>
            {info.genres?.length && (
              <ul className="flex flex-wrap justify-center gap-2">
                {info.genres.map((genre) => (
                  <li
                    key={genre.id}
                    className="bg-[#AE251C] text-white px-3 py-1 italic rounded-md"
                  >
                    {genre.name}
                  </li>
                ))}
              </ul>
            )}
            {info.overview && (
              <p className="w-full md:max-w-[60%]">{info.overview}</p>
            )}
            <div className="flex items-center gap-3">
              <button
                className="flex gap-2 items-center bg-transparent border border-white text-white px-4 py-2 rounded-3xl transition-all duration-300 hover:border-primary hover:text-primary"
                onClick={handleToggleLike}
              >
                {liked ? (
                  <FaHeart color="red" className="animate-heart" />
                ) : (
                  <FiHeart />
                )}
                {/* Like */}
              </button>
              <button
                className="flex gap-2 items-center bg-transparent border border-white text-white px-4 py-2 rounded-3xl transition-all duration-300 hover:border-primary hover:text-primary"
                onClick={handleAddToWatchlist}
              >
                <FaRegEye />
                {/* Watched */}
              </button>
              <button
                className="flex gap-2 items-center bg-transparent border border-white text-white px-4 py-2 rounded-3xl transition-all duration-300 hover:border-primary hover:text-primary"
                onClick={handleAddToWatchlist}
              >
                <FiPlus />
                {/* Add To Watchlist */}
              </button>
              <button
                className="flex gap-2 items-center bg-transparent border border-white text-white px-4 py-2 rounded-3xl transition-all duration-300 hover:border-primary hover:text-primary"
                onClick={() => setIsModalOpen(true)}
              >
                <FaRegStar size={18} />
                {/* Rate Movie */}
              </button>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <RatingModal
          tmdbId={info.tmdbId!}
          title={info.title!}
          poster_path={info.poster_path!}
          onclose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
};

export default MovieInfo;
