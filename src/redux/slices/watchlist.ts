import { createSlice } from "@reduxjs/toolkit";

interface Watchlist {
  watchlist:
      {
        tmdbId: number;
        title: string;
        poster_path: string;
      }[]
    | null;
}

const initialState: Watchlist = {
  watchlist: [],
};

const watchlistSlice = createSlice({
  name: "watchlist",
  initialState,
  reducers: {
    addMovieToWatchlist: (state, action) => {
      state.watchlist?.push(action.payload);
    },
    removeMovieFromWatchlist: (state, action) => {
      const newWatchlist = state.watchlist?.filter(
        (movie) => movie.tmdbId !== action.payload
      );
      state.watchlist = newWatchlist!;
    },
  },
});

export const { addMovieToWatchlist, removeMovieFromWatchlist } =
  watchlistSlice.actions;
export default watchlistSlice.reducer;
