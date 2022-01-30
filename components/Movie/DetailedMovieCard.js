import React from "react";
import { View, StyleSheet } from "react-native";
import { useSelector } from "react-redux";
import { Title, Card } from "react-native-paper";

export function DetailedCard(id) {
  const { movies } = useSelector((state) => state.movieRatings);
  const m = movies[id.id];
  //   console.log(movies);
  console.log(m);
  //let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;

  return (
    <View style={styles.container}>
      <Card style={styles.container}>
        {/* <Card.Cover source={{ uri: url }} style={styles.image} /> */}
        <Card.Content>
          <Title>{m.title}</Title>
        </Card.Content>
        <Card.Actions>
          <RatingButtons id={id} />
        </Card.Actions>
      </Card>{" "}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    height: 500,
    width: 200,
    padding: "1rem",
    margin: 10,
  },
  image: { height: 250 },
});
