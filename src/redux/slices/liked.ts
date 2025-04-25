import { createSlice } from "@reduxjs/toolkit";

interface Liked {
    liked:{
        tmdbId: number;
        title: string;
        poster_path: string;

    }[] | null
}
   

const initialState : Liked = {
    liked  : [],
};

const likedSlice = createSlice({
    name: "liked",
    initialState,
    reducers: {
        addToLikedMovies: (state, action) => {
            state.liked?.push(action.payload);
        },
        removeMovieFromLiked: (state, action) => {
        const newWatchlist = state.liked?.filter((movie) => movie.tmdbId !== action.payload);
        state.liked = newWatchlist!;
    }}
})

export const { addToLikedMovies, removeMovieFromLiked } = likedSlice.actions;
export default likedSlice.reducer