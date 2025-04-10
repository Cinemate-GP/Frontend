import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import watchListReducer from "./slices/watchlist";
import likedReducer from "./slices/liked";
import reviewsReducer from "./slices/reviews";
import recommendedReducer from "./slices/recommended";
import ActivityReducer from "./slices/recentActivity";

export const store = configureStore({
  reducer: {
    user: userReducer,
    watchlist:watchListReducer ,
    liked:likedReducer,
    reviews:reviewsReducer,
    recommended:recommendedReducer,
    recentActivities:ActivityReducer
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;