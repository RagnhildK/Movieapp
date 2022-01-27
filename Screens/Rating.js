import React, { useState } from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie/Movie";
import {addFetchedMovies} from "../redux/movie"

const Rating = () => {
  const { movies } = useSelector((state) => state.movieRatings);

  const dispatch = useDispatch();

  const baseURL =
    "https://api.themoviedb.org/3/movie/popular?api_key=72c828341c35299683ab545ba90e7f50&language=en-US&page=1";
  const getMovie = async () => {
    try {
      const response = await fetch(baseURL);
      const json = await response.json();
      handleResponse(json);
    } catch (error) {
      console.log(error);
    }
  };

  const handleResponse = (response) => {
    dispatch(addFetchedMovies(response));
  };

  const handlePress = () => {
    getMovie();
  };

  return (
    <View>
      <Button onPress={handlePress} title="Hent filmer" />
      {!!movies.results && (
        <View className="MoviesListed">
          <View>
            {movies.results.map((m) => (
              <Movie
                key={m.id}
                id={m.id}
                title={m.title}
                overview={m.overview}
                poster_path={m.poster_path}
              />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Rating;
