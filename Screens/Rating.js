import React, { useState } from "react";
import { View, Button } from "react-native";
import Movie from "../components/Movie/Movie";

const Rating = () => {
  const [movies, setMovies] = useState([]);

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
    setMovies(response);
  };

  const handlePress = () => {
    getMovie();
  };
 
  console.log(movies.results)
  return (
    <View>
      <Button onPress={handlePress} title="Hent filmer" />
      {!!movies.results && (
        <View className="MoviesListed">
          <View>
            {movies.results.map((m) => (
              <Movie key={m.id} title={m.title} abstract={m.abstract} />
            ))}
          </View>
        </View>
      )}
    </View>
  );
};

export default Rating;
