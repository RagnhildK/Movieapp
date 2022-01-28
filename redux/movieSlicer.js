import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creator: false,
  sessionID: "",
  movies: {},
};

export const movieRatingSlice = createSlice({
  name: "movieRatings",
  initialState,
  reducers: {
    setCreator: (state, action) => {
      if (action.payload == "Create") {
        state.creator = true;
      } else state.creator = false;
    },
    setSessionID: (state, action) => {
      state.sessionID = action.payload;
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
export const { setCreator, setSessionID, addFetchedMovie, rateMovie } =
  movieRatingSlice.actions;

export default movieRatingSlice.reducer;
