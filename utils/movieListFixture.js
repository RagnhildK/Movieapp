import { configureStore } from "@reduxjs/toolkit";
import movieRatingReducer from "../redux/movieSlicer"

const movies = {
    425909: {
      title: "Ghostbusters: Afterlife",
      posterPath: "/sg4xJaufDiQl7caFEskBtQXfD4x.jpg",
      overview:
        "When a single mom and her two kids arrive in a small town, they begin to discover their connection to the original Ghostbusters and the secret legacy their grandfather left behind.",
    },
    438695: {
      title: "Sing 2",
      posterPath: "/aWeKITRFbbwY8txG5uCj4rMCfSP.jpg",
      overview:
        "Buster and his new cast now have their sights set on debuting a new show at the Crystal Tower Theater in glamorous Redshore City. But with no connections, he and his singers must sneak into the Crystal Entertainment offices, run by the ruthless wolf mogul Jimmy Crystal, where the gang pitches the ridiculous idea of casting the lion rock legend Clay Calloway in their show. Buster must embark on a quest to find the now-isolated Clay and persuade him to return to the stage.",
    },
    460458: {
      title: "Resident Evil: Welcome to Raccoon City",
      posterPath: "/7uRbWOXxpWDMtnsd2PF3clu65jc.jpg",
      overview:
        "Once the booming home of pharmaceutical giant Umbrella Corporation, Raccoon City is now a dying Midwestern town. The company’s exodus left the city a wasteland…with great evil brewing below the surface. When that evil is unleashed, the townspeople are forever…changed…and a small group of survivors must work together to uncover the truth behind Umbrella and make it through the night.",
    },
    512195: {
      title: "Red Notice",
      posterPath: "/lAXONuqg41NwUMuzMiFvicDET9Y.jpg",
      overview:
        "An Interpol-issued Red Notice is a global alert to hunt and capture the world's most wanted. But when a daring heist brings together the FBI's top profiler and two rival criminals, there's no telling what will happen.",
    },
  };

  export const mockStore = configureStore({
    reducer: {
      movieRatings: movieRatingReducer,
    },
    preloadedState: {
      movieRatings: {
        sessionID: "",
        username: "",
        nmbMovies: 0,
        loading: false,
        movies: movies,
        ratings: {},
        totalResults: {},
        sortedIDs: [],
        participants: [],
      },
    },
  });