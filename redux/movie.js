import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedMovies: [],
  dislikedMovies: [],
};

export const movieSlice = createSlice({
  name: "movieResults",
  initialState,
  reducers: {
    addLikedMovie: (state, action) => {
      state.likedMovie += action.payload;
    },
    addDislikedMovie: (state, action) => {
      state.dislikedMovie += action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { addLikedMovie, addDislikedMovie } = movieSlice.actions;

export default movieSlice.reducer;
