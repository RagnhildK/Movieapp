import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";
import { useSelector } from "react-redux";
import { Title, Card } from "react-native-paper";
import { ScrollView } from "react-native-gesture-handler";

function Movie({ id }) {
  // Renders the movie that is passed as function input
  const { movies } = useSelector((state) => state.movieRatings);
  const m = movies[id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;
  return (
    <Card style={styles.container}>
      <Card.Cover source={{ uri: url }} style={styles.image} />
      {/* <Image style={styles.image} source={{ uri: url }}></Image> */}
      <Card.Content>
        <Title>{m.title}</Title>
        <ScrollView style={styles.scrollView}>
          <Text>{m.overview}</Text>
        </ScrollView>
      </Card.Content>
      <Card.Actions>
        <RatingButtons id={id} />
      </Card.Actions>
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

export default Movie;
