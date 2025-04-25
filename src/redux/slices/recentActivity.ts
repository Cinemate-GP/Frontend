import { createSlice } from "@reduxjs/toolkit";

interface Activities {
  recentActivities:
    | {
        tmdbId: number;
        movieTitle: string;
        poster_path: string;
        activities: {
          type: string;
          title: string;
          review?: string;
          rating?: number;
          createdAt: string;
        }[];
      }[]
    | null;
}

const initialState: Activities = {
  recentActivities: [],
};

const ActivitiesSlice = createSlice({
  name: "recentActivities",
  initialState,
  reducers: {
    addToRecentActivities: (state, action) => {
      const existingMovie = state.recentActivities?.find(
        (movie) => movie.tmdbId === action.payload.tmdbId
      );

      if (!existingMovie) {
        state.recentActivities?.push(action.payload);
      } else {
        const incomingActivity = action.payload.activities[0];
        const hasSameActivity = existingMovie.activities.some(
          (activity) => activity.title === incomingActivity.title
        );

        if (!hasSameActivity) {
          existingMovie.activities.push(incomingActivity);
        }
      }
    },
  },
});

export const { addToRecentActivities } = ActivitiesSlice.actions;
export default ActivitiesSlice.reducer;
