import React from "react";
import { Text } from "react-native";
import { Card, Title } from "react-native-paper";
import { useSelector } from "react-redux";

function ResultMovie(id) {
  const { movies } = useSelector((state) => state.movieRatings);
  const m = movies[id.id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: url }} style={styles.image} />
      {/* <Image style={styles.image} source={{ uri: url }}></Image> */}
      <Card.Content>
        <Title>{m.title}</Title>
      </Card.Content>
    </Card>
  );
}

const styles = {
  container: {
    padding: "1rem",
    margin: 10,
  },
  image: { height: 250 },
  scrollView: {
    maxHeight: 100,
  },
};

export default ResultMovie;
