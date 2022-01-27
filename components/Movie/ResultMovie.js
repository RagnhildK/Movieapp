import React from "react";
import { View, Text, Image } from "react-native";
import { useSelector } from "react-redux";

function ResultMovie(id) {
  const { movies } = useSelector((state) => state.movieRatings);
  const m = movies[id.id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;
  return (
    <View className="MovieItem">
      <Text>{m.title}</Text>
      <Image style={{ width: 200, height: 300 }} source={{ uri: url }}></Image>
    </View>
  );
}

export default ResultMovie;
