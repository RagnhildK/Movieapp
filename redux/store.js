import { configureStore } from "@reduxjs/toolkit";
import movieRatingsReducer from "./movie";

const store = configureStore({
  reducer: {
    movieRatings: movieRatingsReducer
  },
});

export default store;
