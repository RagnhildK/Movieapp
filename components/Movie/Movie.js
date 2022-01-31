import React from "react";
import RatingButtons from "../RatingButton/RatingButtons";
import { useSelector } from "react-redux";
import {
  Title,
  Card,
  Button,
  Modal,
  Portal,
  Subheading,
  Chip,
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
        <Card.Content style={styles.maxWidth}>
          <Title>{movie.title}</Title>
          <RatingButtons id={id} />
          <Button type="text" onPress={() => handlePress(movieId)}>
            <Text style={styles.button}>More info</Text>
          </Button>
        </Card.Content>
        <Portal>
          <Modal
            visible={visible}
            onDismiss={hideModal}
            contentContainerStyle={styles.modal}
          >
            <Card.Cover
              source={{ uri: backdropUrl }}
              style={styles.imageModal}
            />
            <Card.Content style={styles.cardContent}>
              <Title style={styles.subheading}>{movie.title}</Title>
              <Subheading style={styles.subheading}>Overview</Subheading>
              <Text style={styles.col}> {movie.overview}</Text>
              <Subheading style={styles.subheading}>Genres</Subheading>
              <Text>
                {genres.map((i) => (
                  <Chip style={styles.chip}>{i}</Chip>
                ))}
              </Text>
              <Subheading style={styles.subheading}>Runtime</Subheading>
              <Text style={styles.col}>{movieLength} min</Text>
            </Card.Content>
          </Modal>
        </Portal>
      </View>
    </Card>
  );
}

const styles = {
  container: {
    margin: 10,
    overflow: "hidden",
    flexWrap: "wrap",
    backgroundColor: Colors.PURPLE,
  },
  row: {
    flexDirection: "row",
  },
  image: { width: 100 },
  imageModal: {
    height: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 0,
  },
  col: {
    color: Colors.WHITE,
    fontWeight: 200,
  },
  button: {
    color: Colors.ORANGE_DARK,
    fontWeight: "bold",
  },
  modal: {
    backgroundColor: Colors.PURPLE,
    // justifyContent: "flex-start",
    margin: 10,
    borderRadius: 5,
  },
  cardContent: {
    padding: 10,
  },
  subheading: {
    fontWeight: "bold",
    color: Colors.WHITE,
  },
  maxWidth: {
    width: "min-content",
  },
  chip: {
    margin: 4,
  },
};

export default Movie;
