import { createSlice } from "@reduxjs/toolkit";

interface Recommended {
  recommended:
    {
        tmdbId: number;
        title: string;
        poster_path: string;
      }[]
    | null;
}

const initialState: Recommended = {
  recommended: [],
};

const recommendedSlice = createSlice({
  name: "recommended",
  initialState,
  reducers: {
    addToRecomomendedMovies: (state, action) => {
      state.recommended?.push(action.payload);
    },
  },
});

export const { addToRecomomendedMovies } = recommendedSlice.actions;
export default recommendedSlice.reducer;
