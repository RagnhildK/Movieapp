import React, { useState } from "react";
import { View, Button, ScrollView, Text } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie/Movie";
import { addFetchedMovie } from "../redux/movieSlicer";
import { getMovie } from "../.expo/utils/fetch";

const RatingScreen = ({ navigation }) => {
  const { movies, creator } = useSelector((state) => state.movieRatings);

  const dispatch = useDispatch();

  const handleResponse = (response) => {
    response.results.map((m) => dispatch(addFetchedMovie(m)));
  };

  const handlePress = () => {
    getMovie(handleResponse);
  };

  const handleSubmit = () => {
    // TODO send logged info to the backend

    if (creator) {
      navigation.navigate("WaitingScreen");
    } else {
      navigation.navigate("FinishedScreen");
    }
  };

  return (
    <View>
      <Button onPress={handlePress} title="Hent filmer" />
      {!!movies && (
        <ScrollView className="MoviesListed">
          <View>
            {Object.entries(movies).map((m) => (
              <Movie key={m[0]} id={m[0]} />
            ))}
          </View>
        </ScrollView>
      )}
      <Button title="Submit ratings" onPress={() => handleSubmit()} />
    </View>
  );
};

export default RatingScreen;
