import React from "react";
import { Text, View, StyleSheet } from "react-native";
import {
  Card,
  Title,
  Modal,
  Portal,
  Button,
  Subheading,
} from "react-native-paper";
import { useSelector } from "react-redux";
import * as Colors from "../../styles/colors";
import { getDetails } from "../../utils/fetch";
import { AirbnbRating } from "react-native-ratings";

function ResultMovie(id) {
  const { movies, totalResults, participants } = useSelector(
    (state) => state.movieRatings,
  );
  const [visible, setVisible] = React.useState(false);
  const [genres, setGenres] = React.useState(["Couldn't find any genres"]);
  const [movieLength, setMovieLength] = React.useState(0);
  const [backdropUrl, setBackdropUrl] = React.useState();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const movieId = id.id;
  const movie = movies[movieId];
  let url = "https://image.tmdb.org/t/p/w500/" + movie.posterPath;

  const avgRank = () => {
    return totalResults[id.id] / participants.length;
  };

  const handleResponse = (response) => {
    let newGenres = [];
    for (let i = 0; i < response.genres.length; i++) {
      newGenres.push(response.genres[i].name);
    }
    setGenres(newGenres);
    setBackdropUrl("https://image.tmdb.org/t/p/w500" + response.backdrop_path);
    setMovieLength(response.runtime);
  };

  const handlePress = async (movieId) => {
    await getDetails(movieId, handleResponse);
    showModal();
  };

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Card>
            <Card.Cover source={{ uri: backdropUrl }} style={styles.image} />
            <Card.Content>
              <Title style={styles.subheading}>{movie.title}</Title>
              <Subheading style={styles.subheading}>Overview</Subheading>
              <Text>{movie.overview}</Text>
              <Subheading style={styles.subheading}>Genres</Subheading>
              <Text style={styles.col}>{genres.map((i) => `• ${i}\n`)}</Text>
              <Subheading style={styles.subheading}>Runtime</Subheading>
              <Text>{movieLength} min</Text>
              <Subheading style={styles.subheading}>
                Average rating in this session:{" "}
                {avgRank().toLocaleString(undefined, {
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 2,
                })}{" "}
                / 5
              </Subheading>
              <AirbnbRating
                defaultRating={Math.round(avgRank())}
                isDisabled={true}
                showRating={false}
              />
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      <Card style={styles.container}>
        <Card.Cover source={{ uri: url }} style={styles.image} />
        <Card.Content>
          <Title>{movie.title}</Title>
        </Card.Content>
        <Card.Actions>
          <Button type="text" onPress={() => handlePress(movieId)}>
            Show more
          </Button>
        </Card.Actions>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: "1rem",
    margin: 10,
  },
  image: { height: 250 },
  scrollView: {
    maxHeight: 100,
  },
  modal: {
    backgroundColor: Colors.WHITE,
    justifyContent: "flex-start",
    margin: 10,
  },
  subheading: {
    fontWeight: "bold",
  },
});

export default ResultMovie;
