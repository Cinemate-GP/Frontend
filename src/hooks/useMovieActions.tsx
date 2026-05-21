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
  const [liked, setLiked] = useState<boolean | null>(info.isLiked ?? null);
  const [watched, setWatched] = useState<boolean | null>(info.isWatched ?? null);
  const [watchlist, setWatchlist] = useState<boolean | null>(info.isInWatchList ?? null);
  const [showSignIn, setShowSignIn] = useState(false);

  const token = useCookie();
  const userId = getUserId();

  const postedData = {
    tmdbId: info.tmdbId,
    userId: userId,
  };

  const addAction = async (type: boolean | null, addUrl: string, deleteUrl: string) => {
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
        throw new Error(`Failed to ${method === "POST" ? "add" : "remove"} movie`);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const toggleLike = useCallback(() => {
    if (!token) { setShowSignIn(true); return; }
    setLiked((prev) => (prev !== null ? !prev : true));
  }, [token]);

  const toggleWatched = useCallback(() => {
    if (!token) { setShowSignIn(true); return; }
    setWatched((prev) => (prev !== null ? !prev : true));
  }, [token]);

  const toggleWatchlist = useCallback(() => {
    if (!token) { setShowSignIn(true); return; }
    setWatchlist((prev) => (prev !== null ? !prev : true));
  }, [token]);

  useEffect(() => {
    if (liked !== null) {
      addAction(liked, "/api/UserLikeMovie/Add", "/api/UserLikeMovie/Delete");
    }
  }, [liked]);

  useEffect(() => {
    if (watchlist !== null) {
      addAction(watchlist, "/api/UserWatchlistMovie/Add", "/api/UserWatchlistMovie/Delete");
    }
  }, [watchlist]);

  useEffect(() => {
    if (watched !== null) {
      addAction(watched, "/api/UserWatchedMovie/Add", "/api/UserWatchedMovie/Delete");
    }
  }, [watched]);

  return {
    liked,
    watched,
    watchlist,
    toggleWatched,
    toggleLike,
    toggleWatchlist,
    showSignIn,
    setShowSignIn,
  };
};
