"use client";
import { addToLikedMovies, removeMovieFromLiked } from "@/redux/slices/liked";
import { addToRecentActivities } from "@/redux/slices/recentActivity";
import { addMovieToWatchlist } from "@/redux/slices/watchlist";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface MovieInfoProps {
  info: {
    tmdbId: number;
    title: string;
    poster_path: string;
  };
}

export const useMovieInfo = (info: MovieInfoProps["info"]) => {
  // states
  const [liked, setLiked] = useState(false);
  const [watched, setWatched] = useState(false);
  const [backdropImage, setBackdropImage] = useState<string | null>(null);

  // redux
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state: RootState) => state.watchlist);

  // actions function
  const toggleLike = () => setLiked((prev) => !prev);
  const toggleWatched = () => setWatched((prev) => !prev);

  const addToWatchlist = useCallback(() => {
    if (!info.tmdbId) return;
    const isInWatchlist = watchlist?.some((m) => m.tmdbId === info.tmdbId);
    if (isInWatchlist) {
      toast.warning("Already in your watchlist", { position: "bottom-right" });
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
    });
  }, [info, dispatch, watchlist]);

  const fetchBackdropImage = useCallback(async (id: number) => {
    const res = await fetch(
      `https://api.themoviedb.org/3/movie/${id}?api_key=196fb13a1f9bda525f29ed4e3543de8c`
    );
    const data = await res.json();
    return data.backdrop_path
      ? `https://image.tmdb.org/t/p/w780${data.backdrop_path}`
      : null;
  }, []);

  // backdrop image
  useEffect(() => {
    if (info.tmdbId && !backdropImage) {
      fetchBackdropImage(info.tmdbId).then(setBackdropImage);
    }
  }, [info.tmdbId, backdropImage, fetchBackdropImage]);

  // liked effect
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
  }, [liked, info, dispatch]);

  // watched effect
  useEffect(() => {
    if (watched && info.tmdbId) {
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
  }, [liked, info, dispatch, watched]);


  return {
    liked,
    watched,
    onWatched: toggleWatched,
    backdropImage,
    toggleLike,
    addToWatchlist,
  };
};
