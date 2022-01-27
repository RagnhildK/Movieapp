import { configureStore } from "@reduxjs/toolkit";
import movieRatingReducer from "./movieSlicer";

const store = configureStore({
  reducer: {
    movieRatings: movieRatingReducer
  },
});

export default store;
