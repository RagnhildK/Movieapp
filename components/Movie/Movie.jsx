import React from 'react';
import { useSelector } from 'react-redux';
import {
  Title,
  Card,
  Button,
  Modal,
  Portal,
  Subheading,
  Chip,
} from 'react-native-paper';
import { View, Text } from 'react-native';
import RatingButtons from '../RatingButton/RatingButtons';
import * as Colors from '../../styles/colors';
import { getDetails } from '../../utils/fetch';

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
  const url = `https://image.tmdb.org/t/p/w500/${movie.posterPath}`;

  const handleResponse = (response) => {
    const newGenres = [];
    for (let i = 0; i < response.genres.length; i++) {
      newGenres.push(response.genres[i].name);
    }
    setGenres(newGenres);
    setBackdropUrl(`https://image.tmdb.org/t/p/w500${response.backdrop_path}`);
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
          <Title
            style={styles.movieTitle}
            numberOfLines={2}
            ellipsizeMode="tail"
          >
            {movie.title}
          </Title>
          {/* ^ her bør det added på number of lines of ellipsizeMode (?) tail - styling for at tittelen ikke får ta for mye plass */}
          <RatingButtons id={id} />
          <Button type="text" onPress={() => handlePress(movieId)}>
            <Text style={styles.button}>Show more</Text>
          </Button>
        </Card.Content>
      </View>

      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Card.Cover source={{ uri: backdropUrl }} style={styles.imageModal} />
          <Card.Content style={styles.cardContent}>
            <Title style={styles.movieTitle}>{movie.title}</Title>
            <Subheading style={styles.subheading}>Overview</Subheading>
            <Text style={styles.col}>{movie.overview}</Text>
            <Subheading style={styles.subheading}>Genres</Subheading>
            <Text>
              {genres.map((i) => (
                <Chip key={i} disabled={true} style={styles.chip}>
                  <Text style={styles.genresText}>{i}</Text>
                </Chip>
              ))}
            </Text>
            <Subheading style={styles.subheading}>Runtime</Subheading>
            <Text style={styles.col}>
              {movieLength}
              {' '}
              min
            </Text>
          </Card.Content>
        </Modal>
      </Portal>
    </Card>
  );
}

const styles = {
  container: {
    margin: 10,
    overflow: 'hidden',
    flexWrap: 'wrap',
    backgroundColor: Colors.PURPLE,
    // boxShadow: Colors.BROWN_RED,
  },
  row: {
    flexDirection: 'row',
  },
  image: { width: 100, height: 150 },
  imageModal: {
    height: 250,
    borderTopLeftRadius: 5,
    borderTopRightRadius: 5,
    padding: 0,
  },
  col: {
    color: Colors.WHITE,
    fontWeight: '200',
  },
  button: {
    color: Colors.ORANGE_LIGHT,
  },
  modal: {
    backgroundColor: Colors.PURPLE,
    margin: 15,
    borderRadius: 7,
  },
  cardContent: {
    padding: 10,
  },
  subheading: {
    fontWeight: 'bold',
    color: Colors.WHITE,
  },
  movieTitle: {
    fontSize: 20,
    color: Colors.WHITE,
  },
  chip: {
    marginHorizontal: 4,
    maxHeight: 48,
    lineHeight: 10, //usikker på om denne trengs
    backgroundColor: Colors.DARK_PURPLE,
  },
  genresText: {
    // usikker på om dette trengs - må se mer på chips og hvorfor de tar så mye plass
    padding: 0,
    margin: 0,
    color: Colors.WHITE,
  },
};

export default Movie;
