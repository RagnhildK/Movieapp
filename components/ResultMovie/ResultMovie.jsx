import React, {useEffect} from "react";
import { Text, View, StyleSheet, Pressable } from "react-native";
import {
  Card,
  Title,
  Modal,
  Portal,
  Button,
  Subheading,
  Chip,
  Headline,
} from "react-native-paper";
import { useSelector } from "react-redux";
import * as Colors from "../../styles/colors";
import { getDetails } from "../../utils/fetch";
import { AirbnbRating } from "react-native-ratings";
import {incrementRanking} from "../../redux/movieSlicer";

function ResultMovie(id) {
  const { movies, totalResults, participants, sessionID, ranking} = useSelector(
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

  // useEffect(() => {
  //   incrementRanking()
  // }, []);

  return (
    <View style={styles.container}>
     <Headline style={styles.rank}> {ranking} </Headline>
      <Card style={styles.containerCard}>
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
      </Card>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}>
            <Card style={styles.card} onPress={hideModal}>
              <Card.Cover source={{ uri: backdropUrl }}style={styles.imageModal}/>
              <Card.Content style={styles.cardContent}>
                <Title style={styles.movieTitle}>{movie.title}</Title>
                <Subheading style={styles.subheading}>Overview</Subheading>
                <Text style={styles.modalText}>{movie.overview}</Text>
                <Subheading style={styles.subheading}>Genres</Subheading>
                <View style={styles.chipSpacing}>
                  {genres.map((i) => (
                    <Chip key={i} disableed={true} style={styles.chip}>
                      <Text style={styles.genresText}>{i}</Text>
                    </Chip>
                  ))}
                </View>
                <Subheading style={styles.subheading}>Runtime</Subheading>
                <Text style={styles.modalText}>{movieLength} min</Text>
                <Subheading style={styles.subheading}>
                  Average rating in this {sessionID}:{" "}
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
  </View>
  );
}

const styles = StyleSheet.create({
  container: {
    // marginLeft: 20,
    // marginRight: 20,
    // margin: 10,
    flexDirection: "row",
  },
  containerCard: {
    margin: 10,
    marginLeft: 5,
    backgroundColor: Colors.PURPLE,
    flexDirection: "row",
    flexGrow: 1
  },
    col: {
      flexDirection: "column",
    },
  row: {
    flexDirection: "row",
  },
  rank:{
    color: Colors.ORANGE_LIGHT,
    alignSelf: "center",
    marginLeft: 3,
    fontSize: 36,
    fontStyle: "italic",
    lineHeight: 50,
  },
  image: { width: 100, height: 150 },
  movieTitle: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  shrink: {
    flexShrink: 1,
    flex: 2,
    // flexDirection: "column",
    justifyContent: "space-between",
    paddingTop: 10
  },
  button: {
    alignSelf: "flex-end",
    padding: 10
  },
  buttonText: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 16,
    paddingBottom: 10,
  },
  modal: {
    margin: 10,
    borderRadius: 7,
  },
  card:{
    backgroundColor: Colors.PURPLE
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
  chipSpacing: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginBottom: 4,
    marginRight: 4,
    maxHeight: 25,
    backgroundColor: Colors.PURPLE_LIGHT,
    // lineHeight: 10, //usikker på om denne trengs
  },
});

export default ResultMovie;
