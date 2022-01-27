import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [],
};

export const movieRatingSlice = createSlice({
  name: "movieRatings",
  initialState,
  reducers: {
    addFetchedMovies: (state, action) => {
        state.movies = (action.payload);
      },
    rateMovie: (state, action) => {
        // state.movies.push = (action.payload);

    },
  },
});

// Action creators are generated for each case reducer function
export const { addFetchedMovies, rateMovie } = movieRatingSlice.actions;

export default movieRatingSlice.reducer;
