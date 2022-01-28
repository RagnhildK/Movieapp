import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creator: false,
  movies: {},
};

export const movieRatingSlice = createSlice({
  name: "movieRatings",
  initialState,
  reducers: {
    setCreator: (state, action) => {
      if (action.payload == "Create") {
        state.creator = true;
        console.log(action.payload);
      } else state.creator = false;
    },
    addFetchedMovie: (state, action) => {
      const id = action.payload.id;
      state.movies[id] = {
        title: action.payload.title,
        posterPath: action.payload.poster_path,
        overview: action.payload.overview,
        rating: null,
      };
    },
    rateMovie: (state, action) => {
      const id = action.payload.id;
      state.movies[id].rating = action.payload.rating;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setCreator, addFetchedMovie, rateMovie } =
  movieRatingSlice.actions;

export default movieRatingSlice.reducer;
