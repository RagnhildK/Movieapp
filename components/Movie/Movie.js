import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";
import { useSelector } from "react-redux";
import { Title } from 'react-native-paper';

function Movie({ id }) {
  // Renders the movie that is passed as function input
  const { movies } = useSelector((state) => state.movieRatings);
  const m = movies[id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;
  return (
    <View style={styles.container}>
      <Title>{m.title}</Title>
      <Image style={{ width: 200, height: 300, padding: "1rem" }} source={{ uri: url }}></Image>
      <Text>{m.overview}</Text>
      <RatingButtons id={id} />
    </View>
  );
}

const styles = {
  container: {
    flex: 1,
    flexDirection: "column",
    alignItems: "center",
    padding: "1rem"
  },
};

export default Movie;
