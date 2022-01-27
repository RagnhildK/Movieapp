import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratedMovies: [],
};

export const movieRatingsSlice = createSlice({
  name: "movieRatings",
  initialState,
  reducers: {
    addRatedMovie: (state, action) => {
      state.ratedMovies = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRatedMovie } = movieRatingsSlice.actions;

export default movieRatingsSlice.reducer;
