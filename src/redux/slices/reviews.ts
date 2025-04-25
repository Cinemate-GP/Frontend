import { createSlice } from "@reduxjs/toolkit";

interface Reviews {
  reviews:
    | {
        tmdbId: number;
        title: string;
        poster_path: string;
        message: string;
        rating?: number;
        createdAt: string;
      }[]
    | null;
}

const initialState: Reviews = {
  reviews: [],
};

const reviewsSlice = createSlice({
  name: "reviews",
  initialState,
  reducers: {
    addToReviews: (state, action) => {
        const index = state.reviews?.findIndex(
          (m) => m.tmdbId === action.payload.tmdbId
        );
      
        if (index === -1 || index === undefined) {
          state.reviews?.push(action.payload);
        } else {
          state.reviews![index] = action.payload;
        }
      },
    removeMovieFromReviews: (state, action) => {
      const newWatchlist = state.reviews?.filter(
        (movie) => movie.tmdbId !== action.payload
      );
      state.reviews = newWatchlist!;
    },
  },
});

export const { addToReviews, removeMovieFromReviews } = reviewsSlice.actions;
export default reviewsSlice.reducer;
