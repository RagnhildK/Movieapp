import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { Card, Title, Modal, Portal, Button } from "react-native-paper";
import { useSelector } from "react-redux";
import * as Colors from "../../styles/colors";
import { DetailedCard } from "./DetailedMovieCard";

function ResultMovie(id) {
  const { movies, totalResults, participants } = useSelector(
    (state) => state.movieRatings,
  );
  const [visible, setVisible] = React.useState(false);

  // const avgRank = () => {
  //   // console.log()
  //   return totalResults[id] / participants;
  // };

  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  const m = movies[id.id];
  let url = "https://image.tmdb.org/t/p/w500/" + m.posterPath;

  return (
    <View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={styles.modal}
        >
          <Card>
            <Card.Cover source={{ uri: url }} style={styles.image} />
            <Card.Content>
              <Title>{m.title}</Title>
              <Text>{m.overview}</Text>
              {/* <Text>{avgRank()}</Text> */}
            </Card.Content>
          </Card>
        </Modal>
      </Portal>
      <Card style={styles.container}>
        <Card.Cover source={{ uri: url }} style={styles.image} />
        {/* <Image style={styles.image} source={{ uri: url }}></Image> */}
        <Card.Content>
          <Title>{m.title}</Title>
        </Card.Content>
        <Card.Actions>
          <Button type="text" onPress={showModal}>
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
  },
});

export default ResultMovie;
