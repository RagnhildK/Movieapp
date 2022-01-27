import { configureStore } from "@reduxjs/toolkit";
import movieReducer from "./movie";

const store = configureStore({
  reducer: {
    movieResults: movieReducer
  },
});

export default store;
