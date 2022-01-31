import React from "react";
import RatingButtons from "./RatingButtons";
import { useSelector } from "react-redux";
import { Title, Card, Button, Modal, Portal } from "react-native-paper";
import { Image, View, Text } from "react-native";
import * as Colors from "../../styles/colors";

function Movie({ id }) {
  // Renders the movie that is passed as function input
  const { movies } = useSelector((state) => state.movieRatings);

  const [visible, setVisible] = React.useState(false);

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);

  const m = movies[id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;
  return (
    <Card style={styles.container}>
      <View style={styles.row}>
        <Card.Cover source={{ uri: url }} style={styles.image} />
        {/* <Image style={styles.image} source={{ uri: url }}></Image> */}
        <View>
          <Title numberOfLines={1} ellipsizeMode="tail">
            {m.title}
          </Title>
          <Card.Actions style={styles.col}>
            <RatingButtons id={id} />
            <Button type="text" onPress={showModal}>
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
                <Card.Cover source={{ uri: url }} style={styles.imageModal} />
                <Card.Content>
                  <Title>{m.title}</Title>
                  <Text>{m.overview}</Text>
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
  },
  button: {
    color: Colors.ORANGE_DARK,
    fontWeight: "bold",
  },
};

export default Movie;
