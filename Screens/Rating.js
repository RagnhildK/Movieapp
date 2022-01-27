import React, { useState } from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie/Movie";
import { addFetchedMovie } from "../redux/movieSlicer";

const Rating = ({ navigation }) => {
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
    response.results.map((m) => dispatch(addFetchedMovie(m)));
  };

  const handlePress = () => {
    getMovie();
  };

  return (
    <View>
      <Button
        title="Go to results"
        onPress={() => navigation.navigate("Result")}
      />
      <Button onPress={handlePress} title="Hent filmer" />
      {!!movies && (
        <View className="MoviesListed">
          <View>
            {Object.entries(movies).map((m) => (
              <Movie key={m[0]} id={m[0]} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Rating;
