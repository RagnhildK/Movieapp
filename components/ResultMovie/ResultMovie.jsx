import React from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Card,
  Title,
  Modal,
  Portal,
  Button,
  Subheading,
  Chip,
} from "react-native-paper";
import { useSelector } from "react-redux";
import * as Colors from "../../styles/colors";
import { getDetails } from "../../utils/fetch";
import { AirbnbRating } from "react-native-ratings";

function ResultMovie(id) {
  const { movies, totalResults, participants } = useSelector(
    (state) => state.movieRatings
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
    <Card style={styles.container}>
      <View style={styles.row}>
        <Card.Cover source={{ uri: url }} style={styles.image} />
        <Card.Content style={styles.shrink}>
          <Title
            numberOfLines={2}
            ellipsizeMode="tail"
            style={styles.movieTitle}
          >
            {movie.title}
          </Title>
          <Pressable
            style={styles.button}
            type="text"
            onPress={() => handlePress(movieId)}
          >
            <Text style={styles.buttonText}>SHOW MORE</Text>
          </Pressable>
        </Card.Content>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
            <Card.Cover source={{ uri: backdropUrl }}style={styles.imageModal}/>
            <Card.Content style={styles.cardContent}>
              <Title style={styles.movieTitle}>{movie.title}</Title>
              <Subheading style={styles.subheading}>Overview</Subheading>
              <Text style={styles.modalText}>{movie.overview}</Text>
              <Subheading style={styles.subheading}>Genres</Subheading>
              <Text>
                {genres.map((i) => (
                  <Chip key={i} disableed={true} style={styles.chip}>
                    <Text style={styles.genresText}>{i}</Text>
                  </Chip>
                ))}
              </Text>
              <Subheading style={styles.subheading}>Runtime</Subheading>
              <Text style={styles.modalText}>{movieLength} min</Text>
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
        </Modal>
      </Portal>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    backgroundColor: Colors.PURPLE,
  },
  row: {
    flexDirection: "row",
  },
  image: { width: 100, height: 150 },
  movieTitle: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  shrink: {
    flexShrink: 1,
    flex: 2,
    flexDirection: "column",
    justifyContent: "space-between"
  },
  button: {
    alignSelf: "flex-end",
  },
  buttonText: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 12,
    paddingBottom: 10,
  },
  modal: {
    backgroundColor: Colors.PURPLE,
    margin: 10,
    borderRadius: 7,
  },
  imageModal: {
    height: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 0,
  },
  cardContent: {
    padding: 10,
  },
  subheading: {
    // fontWeight: "bold",
    color: Colors.WHITE
  },  
  modalText: {
    color: Colors.WHITE,
    fontWeight: "200",
  },
  chip: {
    marginHorizontal: 4,
    maxHeight: 48,
    lineHeight: 10, //usikker på om denne trengs
  },
});

export default ResultMovie;
