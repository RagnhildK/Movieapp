import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  ratedMovies: [],
};

export const movieSlice = createSlice({
  name: "movieResults",
  initialState,
  reducers: {
    addRatedMovie: (state, action) => {
      state.ratedMovies += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addRatedMovie } = movieSlice.actions;

export default movieSlice.reducer;
