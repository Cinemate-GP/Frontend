/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import { getUserId } from "@/lib/utils";
import { addToRecentActivities } from "@/redux/slices/recentActivity";
import { RootState } from "@/redux/store";
import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface MovieInfoProps {
  info: {
    tmdbId: number | undefined;
    title: string | undefined;
    backdropPath: string | undefined;
    posterPath: string | undefined;
  };
}

export const useMovieInfo = (info: MovieInfoProps["info"]) => {
  // states
  const [liked, setLiked] = useState<boolean | null>(null);
  const [watched, setWatched] = useState<boolean | null>(null);

  // redux
  const dispatch = useDispatch();
  const { watchlist } = useSelector((state: RootState) => state.watchlist);

  // localstorage and cookies
  const token = document.cookie.split("=")[1];

  // post data
  const postedData = {
    tmdbId: info.tmdbId,
    userId: getUserId(),
  };

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
    dispatch(addToRecentActivities({
      tmdbId: info.tmdbId,
      movieTitle: info.title,
      poster_path: info.posterPath,
      activities: [
        {
          type: 'watchlist',
          title: "added to watchlist",
          createdAt: new Date().toISOString(),
        },
      ],
    }))

    
  }, [info, , watchlist]);

  // liked effect
  useEffect(() => {
    if (liked && info.tmdbId) {
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
          dispatch(
            addToRecentActivities({
              tmdbId: info.tmdbId,
              movieTitle: info.title,
              poster_path: info.posterPath,
              activities: [
                {
                  id: 1,
                  title: "added to liked",
                  createdAt: new Date().toISOString(),
                },
              ],
            })
          );
        } catch (error) {
          console.log(error);
        }
      })();
      dispatch(
        addToRecentActivities({
          tmdbId: info.tmdbId,
          movieTitle: info.title,
          poster_path: info.posterPath,
          activities: [
            {
              type: "liked",
              title: "added to liked",
              createdAt: new Date().toISOString(),
            },
          ],
        })
      );
    } else if (liked === false && info.tmdbId) {
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
          movieTitle: info.title,
          poster_path: info.posterPath,
          activities: [
            {
              type: "watched",
              title: "added to watched",
              createdAt: new Date().toISOString(),
            },
          ],
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
    toggleLike,
    addToWatchlist,
  };
};
