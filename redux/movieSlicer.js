import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: {},
};

export const movieRatingSlice = createSlice({
  name: "movieRatings",
  initialState,
  reducers: {
    addFetchedMovie: (state, action) => {
      const id = action.payload.id;
      state.movies[id] = {
        title: action.payload.title,
        posterPath: action.payload.poster_path,
        overview: action.payload.overview,
        rating: null
      };
    },
    rateMovie: (state, action) => {
      const id = action.payload.id;
      state.movies.id.rating = action.payload.rating;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addFetchedMovie, rateMovie } = movieRatingSlice.actions;

export default movieRatingSlice.reducer;
