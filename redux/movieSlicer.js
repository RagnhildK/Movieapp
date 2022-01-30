import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  creator: false,
  sessionID: "",
  username: "",
  nmbMovies: 0,
  loading: false,
  movies: {},
  ratings: {},
  results: {},
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
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setNmbMovies: (state, action) => {
      state.nmbMovies = action.payload;
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
    addFetchedMovie: (state, action) => {
      const id = action.payload.id;
      state.movies[id] = {
        title: action.payload.title,
        posterPath: action.payload.poster_path,
        overview: action.payload.overview,
      };
      state.ratings[id] = 0;
    },
    rateMovie: (state, action) => {
      const id = action.payload.id;
      state.ratings[id] = action.payload.rating;
    },
    setResults: (state, action) => {
      console.log(action.payload.movieId);
      console.log(isNaN(action.payload.rating));
      const id = action.payload.movieId;
      state.results[id] = isNaN(state.results[id])
        ? action.payload.rating
        : state.results[id] + action.payload.rating;
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setCreator,
  setSessionID,
  setUsername,
  setNmbMovies,
  setLoading,
  addFetchedMovie,
  rateMovie,
  setResults,
} = movieRatingSlice.actions;

export default movieRatingSlice.reducer;
