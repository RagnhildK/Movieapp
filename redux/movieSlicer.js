import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  sessionID: "",
  username: "",
  nmbMovies: "",
  loading: false,
  movies: {},
  ratings: {},
  totalResults: {},
  sortedIDs: [],
  participants: [],
};

export const movieRatingSlice = createSlice({
  name: "movieRatings",
  initialState,
  reducers: {
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
    setTotalResults: (state, action) => {
      const id = action.payload.movieId;
      state.totalResults[id] = isNaN(state.totalResults[id])
        ? action.payload.rating
        : state.totalResults[id] + action.payload.rating;
    },
    sortTotalResults: (state) => {
      const sortable = Object.entries(state.totalResults);
      sortable.sort(function (a, b) {
        return b[1] - a[1];
      });
      state.sortedIDs = sortable;
    },
    addParticipant: (state, action) => {
      state.participants.push(action.payload);
    },
    resetResultScreen: (state) => {
      state.participants = [];
      state.totalResults = {};
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  setSessionID,
  setUsername,
  setNmbMovies,
  setLoading,
  addFetchedMovie,
  rateMovie,
  setTotalResults,
  sortTotalResults,
  addParticipant,
  resetResultScreen,
} = movieRatingSlice.actions;

export default movieRatingSlice.reducer;
