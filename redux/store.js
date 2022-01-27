import { configureStore } from "@reduxjs/toolkit";
import movieRatingReducer from "./movie";

const store = configureStore({
  reducer: {
    movieRatings: movieRatingReducer
  },
});

export default store;
