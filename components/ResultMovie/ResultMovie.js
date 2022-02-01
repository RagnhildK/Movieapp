import React from "react";
import { Text, View, StyleSheet } from "react-native";
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
    <Card style={styles.container}>
      <View style={styles.row}>
        <Card.Cover source={{ uri: url }} style={styles.image} />
        <Card.Content style={styles.cardWidth}>
          <Title style={styles.movieTitle}>{movie.title}</Title>
          <Button type="text" onPress={() => handlePress(movieId)}>
            Show more
          </Button>
        </Card.Content>
      </View>

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
                {genres.map((i) => (
                  <Chip key={i} disableed={true} style={styles.chip}>
                    <Text style={styles.genresText}>{i}</Text>
                  </Chip>
                ))}
              </Text>
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
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    margin: 10,
    overflow: "hidden",
    flexWrap: "wrap",
    backgroundColor: Colors.PURPLE,
  },
  row: {
    flexDirection: "row",
  },
  cardWidth: {
    width: "min-content", //ios talker ikke dette, men har ikke funnet et alt.
  },
  image: { width: 100, height: 150 },
  movieTitle: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  button: {
    color: Colors.ORANGE_DARK,
  },
  modal: {
    backgroundColor: Colors.PURPLE,
    justifyContent: "flex-start",
    margin: 10,
  },
  imageModal: {
    height: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 0,
  },
  subheading: {
    fontWeight: "bold",
  },
  chip: {
    marginHorizontal: 4,
    maxHeight: 48,
    lineHeight: 10, //usikker på om denne trengs
  },
});

export default ResultMovie;
