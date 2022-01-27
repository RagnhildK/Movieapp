import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";
import { useSelector } from "react-redux";

function Movie({ id }) {
  // Renders the movie that is passed as function input
  const { movies } = useSelector((state) => state.movieRatings);
  const m = movies[id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;
  return (
    <View className="MovieItem">
      <Text>{m.title}</Text>
      <Image style={{ width: 200, height: 300 }} source={{ uri: url }}></Image>
      <Text>{m.overview}</Text>
      <RatingButtons id={id} />
    </View>
  );
}

export default Movie;
