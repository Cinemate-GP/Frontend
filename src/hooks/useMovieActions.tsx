/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { addToRecentActivities } from "@/redux/slices/recentActivity";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface MovieInfoProps {
  info: {
    movieId: number | undefined;
    tmdbId: number | undefined;
    title: string | undefined;
    poster_path: string | undefined;
  };
}

export const useMovieInfo = (info: MovieInfoProps["info"]) => {
  // states
  const [liked, setLiked] = useState<boolean | null>(null);
  const [watched, setWatched] = useState<boolean | null>(null);
  const [backdropImage, setBackdropImage] = useState<string | null>(null);

  const {user} = JSON.parse(localStorage.getItem("user") || "{}");
  console.log(user.id)
  const token = document.cookie.split("=")[1];

  const postedData = {
    movieId: info.movieId,
    userId: user.id,
  };

  // redux
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state: RootState) => state.watchlist);

  // toggle like function
  const toggleLike = useCallback(() => {
    setLiked((prev) => !prev);
  }, [liked]);

  // toggle watched function
  const toggleWatched = useCallback(() => {
    setWatched((prev) => !prev);
  }, [watched]);

  // add to watchlist
  const addToWatchlist = useCallback(async () => {
    try {
      const res = await fetch("/api/UserWatchlistMovie/Add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postedData),
      });
      if (!res.ok) throw new Error("Failed to fetch data");
      toast.success("Added to watchlist successfully!", {
        theme: "dark",
        position: "bottom-right",
      });
    } catch (error) {
      console.log(error);
    }

    // if (isInWatchlist) {
    //   toast.warning("Already in your watchlist", { position: "bottom-right" });
    //   return;
    // }

  
  }, [info, , watchlist]);

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
    if (liked && info.movieId) {
      (async function () {
        try {
          const res = await fetch("/api/UserLikeMovie/Add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postedData),
          });
          if (!res.ok) throw new Error("Failed to add movie to liked");
        } catch (error) {
          console.log(error);
        }
      })();
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
    } else if (liked === false && info.movieId) {
      (async function () {
        try {
          const res = await fetch("/api/UserLikeMovie/Delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postedData),
          });
          if (!res.ok) throw new Error("Failed to remove movie from liked");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [liked]);

  // watched effect
  useEffect(() => {
    if (watched && info.tmdbId) {
      (async function () {
        try {
          const res = await fetch("/api/UserWatchedMovie/Add", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postedData),
          });
          if (!res.ok) throw new Error("Failed to add movie to watched");
        } catch (error) {
          console.log(error);
        }
      })();
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
    } else if (watched === false && info.tmdbId) {
      (async function () {
        try {
          const res = await fetch("/api/UserWatchedMovie/Delete", {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
            body: JSON.stringify(postedData),
          });
          if (!res.ok) throw new Error("Failed to remove movie from watched");
        } catch (error) {
          console.log(error);
        }
      })();
    }
  }, [watched]);

  return {
    liked,
    watched,
    onWatched: toggleWatched,
    backdropImage,
    toggleLike,
    addToWatchlist,
  };
};
