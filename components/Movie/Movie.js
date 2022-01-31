import React from "react";
import RatingButtons from "./RatingButtons";
import { useSelector } from "react-redux";
import {
  Title,
  Card,
  Button,
  Modal,
  Portal,
  Subheading,
} from "react-native-paper";
import { Image, View, Text } from "react-native";
import * as Colors from "../../styles/colors";
import { getDetails } from "../../utils/fetch";

function Movie({ id }) {
  // Renders the movie that is passed as function input
  const { movies } = useSelector((state) => state.movieRatings);

  const [visible, setVisible] = React.useState(false);
  const [genres, setGenres] = React.useState(["Couldn't find any genres"]);
  const [movieLength, setMovieLength] = React.useState(0);
  const [backdropUrl, setBackdropUrl] = React.useState();

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const movieId = id;
  const movie = movies[movieId];
  let url = "https://image.tmdb.org/t/p/w500/" + movie.posterPath;

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
    <Card style={styles.container}>
      <View style={styles.row}>
        <Card.Cover source={{ uri: url }} style={styles.image} />
        <View>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {movie.title}
          </Title>
          <Card.Actions style={styles.col}>
            <RatingButtons id={id} />
            <Button type="text" onPress={() => handlePress(movieId)}>
              <Text style={styles.button}>More info</Text>
            </Button>
          </Card.Actions>
          <Portal>
            <Modal
              visible={visible}
              onDismiss={hideModal}
              contentContainerStyle={styles.modal}
            >
              <Card>
                <Card.Cover
                  source={{ uri: backdropUrl }}
                  style={styles.imageModal}
                />
                <Card.Content>
                  <Title style={styles.subheading}>{movie.title}</Title>
                  <Subheading style={styles.subheading}>Overview</Subheading>
                  <Text>{movie.overview}</Text>
                  <Subheading style={styles.subheading}>Genres</Subheading>
                  <Text>
                    {genres.map((g) => (
                      <Text key={g}>{g} </Text>
                    ))}
                  </Text>
                  <Subheading style={styles.subheading}>Runtime</Subheading>
                  <Text>{movieLength} min</Text>
                </Card.Content>
              </Card>
            </Modal>
          </Portal>
        </View>
      </View>
    </Card>
  );
}

const styles = {
  container: {
    margin: 10,
  },
  row: {
    flexDirection: "row",
  },
  image: { width: 100 },
  imageModal: {
    height: 250,
  },
  col: {
    flexDirection: "col",
    alignItems: "flex-start",
  },
  button: {
    color: Colors.ORANGE_DARK,
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: Colors.WHITE,
    justifyContent: "flex-start",
    margin: 10,
    borderRadius: 20,
  },
  subheading: {
    fontWeight: "bold",
  },
};

export default Movie;
