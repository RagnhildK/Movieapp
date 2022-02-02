import reducer, {
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
} from "./movieSlicer";
import {
  initialState,
  oneMoviesResult,
  twoMoviesResult,
} from "../utils/movieListFixture";

jest.useFakeTimers();

test("should return the initial state", () => {
  expect(reducer(undefined, {})).toEqual(initialState);
});

test("Should handle setting the sessionID", () => {
  expect(reducer(initialState, setSessionID("Hanna"))).toEqual({
    sessionID: "Hanna",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle setting the username", () => {
  expect(reducer(initialState, setUsername("Hanna"))).toEqual({
    sessionID: "",
    username: "Hanna",
    nmbMovies: "",
    loading: false,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle setting the number of movies to be rated", () => {
  expect(reducer(initialState, setNmbMovies("45"))).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "45",
    loading: false,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: [],
  });
});


test("Should handle setting the loading to true", () => {
  expect(reducer(initialState, setLoading(true))).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: true,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle setting the loading to false", () => {
  expect(
    reducer(
      {
        sessionID: "",
        username: "",
        nmbMovies: "",
        loading: true,
        movies: {},
        ratings: {},
        totalResults: {},
        sortedIDs: [],
        participants: [],
      },
      setLoading(false)
    )
  ).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle setting one fetched movies to store when there are no movies", () => {
  expect(
    reducer(
      initialState,
      addFetchedMovie({
        adult: false,
        backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
        genre_ids: [28, 12, 878],
        id: 634649,
        original_language: "en",
        original_title: "title1",
        overview: "overview1",
        popularity: 27352.884,
        poster_path: "/posterpath1.jpg",
        release_date: "2021-12-15",
        title: "title1",
        video: false,
        vote_average: 8.4,
        vote_count: 6580,
      })
    )
  ).toEqual(oneMoviesResult);
});

test("Should handle setting one fetched movies to store", () => {
  expect(
    reducer(
      oneMoviesResult,
      addFetchedMovie({
        adult: false,
        backdrop_path: "/iQFcwSGbZXMkeyKrxbPnwnRo5fl.jpg",
        genre_ids: [28, 12, 878],
        id: 634650,
        original_language: "en",
        original_title: "Movie2",
        overview: "overview2",
        popularity: 27352.884,
        poster_path: "/posterpath2.jpg",
        release_date: "2021-12-15",
        title: "Title2",
        video: false,
        vote_average: 8.4,
        vote_count: 6580,
      })
    )
  ).toEqual(twoMoviesResult);
});

test("Should handle rating a movie", () => {
  expect(
    reducer(twoMoviesResult, rateMovie({ rating: 5, id: 634649 }))
  ).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {
      634649: {
        title: "title1",
        posterPath: "/posterpath1.jpg",
        overview: "overview1",
      },
      634650: {
        title: "Title2",
        posterPath: "/posterpath2.jpg",
        overview: "overview2",
      },
    },
    ratings: {
      634649: 5,
      634650: 0,
    },
    totalResults: {},
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle setting totalResults when there are no results", () => {
  expect(
    reducer(twoMoviesResult, setTotalResults({ movieId: 634649, rating: 5 }))
  ).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {
      634649: {
        title: "title1",
        posterPath: "/posterpath1.jpg",
        overview: "overview1",
      },
      634650: {
        title: "Title2",
        posterPath: "/posterpath2.jpg",
        overview: "overview2",
      },
    },
    ratings: {
      634649: 0,
      634650: 0,
    },
    totalResults: { 634649: 5 },
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle setting totalResults", () => {
  expect(
    reducer(
      {
        sessionID: "",
        username: "",
        nmbMovies: "",
        loading: false,
        movies: {
          634649: {
            title: "title1",
            posterPath: "/posterpath1.jpg",
            overview: "overview1",
          },
          634650: {
            title: "Title2",
            posterPath: "/posterpath2.jpg",
            overview: "overview2",
          },
        },
        ratings: {
          634649: 0,
          634650: 0,
        },
        totalResults: { 634649: 5 },
        sortedIDs: [],
        participants: [],
      },
      setTotalResults({ movieId: 634649, rating: 3 })
    )
  ).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {
      634649: {
        title: "title1",
        posterPath: "/posterpath1.jpg",
        overview: "overview1",
      },
      634650: {
        title: "Title2",
        posterPath: "/posterpath2.jpg",
        overview: "overview2",
      },
    },
    ratings: {
      634649: 0,
      634650: 0,
    },
    totalResults: { 634649: 8 },
    sortedIDs: [],
    participants: [],
  });
});

test("Should handle sorting totalResults", () => {
  expect(
    reducer(
      {
        sessionID: "",
        username: "",
        nmbMovies: "",
        loading: false,
        movies: {
          634649: {
            title: "title1",
            posterPath: "/posterpath1.jpg",
            overview: "overview1",
          },
          634650: {
            title: "Title2",
            posterPath: "/posterpath2.jpg",
            overview: "overview2",
          },
          634651: {
            title: "title3",
            posterPath: "/posterpath3.jpg",
            overview: "overview3",
          },
        },
        ratings: {
          634649: 0,
          634650: 5,
          634651: 3,
        },
        634651: 3,
        totalResults: { 634649: 0, 634650: 5, 634651: 3 },
        sortedIDs: [],
        participants: [],
      },
      sortTotalResults({ movieId: 634649, rating: 5 })
    )
  ).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {
      634649: {
        title: "title1",
        posterPath: "/posterpath1.jpg",
        overview: "overview1",
      },
      634650: {
        title: "Title2",
        posterPath: "/posterpath2.jpg",
        overview: "overview2",
      },
      634651: {
        title: "title3",
        posterPath: "/posterpath3.jpg",
        overview: "overview3",
      },
    },
    ratings: {
      634649: 0,
      634650: 5,
      634651: 3,
    },
    634651: 3,
    totalResults: { 634649: 0, 634650: 5, 634651: 3 },
    sortedIDs: [
      ["634650", 5],
      ["634651", 3],
      ["634649", 0],
    ],
    participants: [],
  });
});

test("Should handle adding a participant when creating a session", () => {
  expect(reducer(initialState, addParticipant("Hanna"))).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: ["Hanna"],
  });
});

test("Should handle adding a participant when joining a session", () => {
  expect(
    reducer(
      {
        sessionID: "",
        username: "",
        nmbMovies: "",
        loading: false,
        movies: {},
        ratings: {},
        totalResults: {},
        sortedIDs: [],
        participants: ["Hanna"],
      },
      addParticipant("Ragnhild")
    )
  ).toEqual({
    sessionID: "",
    username: "",
    nmbMovies: "",
    loading: false,
    movies: {},
    ratings: {},
    totalResults: {},
    sortedIDs: [],
    participants: ["Hanna", "Ragnhild"],
  });
});

test("Should handle resetting participants and total results", () => {
  expect(
    reducer(
      {
        sessionID: "",
        username: "",
        nmbMovies: "",
        loading: false,
        movies: {},
        ratings: {},
        totalResults: { 634649: 0, 634650: 5, 634651: 3 },
        sortedIDs: [],
        participants: ["Hanna", "Ragnhild"],
      },
      resetResultScreen("Ragnhild")
    )
  ).toEqual(initialState);
});
