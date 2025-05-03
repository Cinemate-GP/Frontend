/* eslint-disable react-hooks/exhaustive-deps */
"use client";

import { getUserId } from "@/lib/utils";
import { useCallback, useEffect, useState } from "react";
import { useCookie } from "./useCookie";
import { authFetch } from "@/lib/api";

interface MovieInfoProps {
  tmdbId: number | undefined;
  isLiked: boolean | undefined;
  isWatched: boolean | undefined;
  isInWatchList: boolean | undefined;
}

export const useMovieInfo = (info: MovieInfoProps) => {
  console.log(info.isInWatchList)
  // states
  const [liked, setLiked] = useState<boolean | null>(info.isLiked ?? null);
  const [watched, setWatched] = useState<boolean | null>(
    info.isWatched ?? null
  );
  const [watchlist, setWatchlist] = useState<boolean | null>(
    info.isInWatchList ?? null
  );

  // Get token from cookie hook
  const token = useCookie();
  const userId = getUserId();

  // Post data
  const postedData = {
    tmdbId: info.tmdbId,
    userId: userId,
  };

  // Handle adding or deleting action
  const addAction = async (
    type: boolean | null,
    addUrl: string,
    deleteUrl: string
  ) => {
    if (!token || !postedData.tmdbId || !postedData.userId || type === null) {
      console.warn("Request canceled: Missing token or data");
      return;
    }

    const url = type ? addUrl : deleteUrl;
    const method = type ? "POST" : "DELETE";

    try {
      const res = await authFetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(postedData),
      });

      if (!res.ok) {
        throw new Error(
          `Failed to ${method === "POST" ? "add" : "remove"} movie`
        );
      }
    } catch (error) {
      console.error(error);
    }
  };

  // Toggle like
  const toggleLike = useCallback(() => {
    setLiked((prev) => (prev !== null ? !prev : true));
  }, []);

  // Toggle watched
  const toggleWatched = useCallback(() => {
    setWatched((prev) => (prev !== null ? !prev : true));
  }, []);

  // Toggle watchlist
  const toggleWatchlist = useCallback(() => {
    setWatchlist((prev) => (prev !== null ? !prev : true));
  }, []);

  // Liked effect
  useEffect(() => {
    if (liked !== null) {
      addAction(liked, "/api/UserLikeMovie/Add", "/api/UserLikeMovie/Delete");
    }
  }, [liked]);

  // Watchlist effect
  useEffect(() => {
    if (watchlist !== null) {
      addAction(
        watchlist,
        "/api/UserWatchlistMovie/Add",
        "/api/UserWatchlistMovie/Delete"
      );
    }
  }, [watchlist]);

  // Watched effect
  useEffect(() => {
    if (watched !== null) {
      addAction(
        watched,
        "/api/UserWatchedMovie/Add",
        "/api/UserWatchedMovie/Delete"
      );
    }
  }, [watched]);

  return {
    liked,
    watched,
    watchlist,
    toggleWatched,
    toggleLike,
    toggleWatchlist,
  };
};
