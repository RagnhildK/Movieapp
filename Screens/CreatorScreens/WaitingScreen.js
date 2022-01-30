import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Colors from "../../styles/colors";
import { getRatings } from "../../firebase";
import { useSelector, useDispatch } from "react-redux";
import { setTotalResults } from "../../redux/movieSlicer";

// dispatch
// denne skjer i en loop så lenge personen er på denne siden
// her skal getrating fra backend kalles
// ratings fra getratings må lagres i redux
// funksjonalitet for å regne ut hvor mange partiipants som har ratet og hvor mange som skal rate
// dispatch slutt

export default function WaitingScreen({ navigation }) {
  const { sessionID } = useSelector((state) => state.movieRatings);

  const dispatch = useDispatch();

  const handleResponse = (response) => {
    for (let user in response) {
      let userRatings = response[user];
      for (let movieId in userRatings) {
        let rating = userRatings[movieId];
        dispatch(setTotalResults({ movieId: movieId, rating: rating }));
      }
    }
  };

  const handlePress = () => {
    getRatings(sessionID, handleResponse);
    navigation.navigate("ResultScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Wait for other members or end session.</Text>
      <Pressable style={styles.button} onPress={() => handlePress()}>
        <Text style={styles.buttonText}> View results</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
    marginLeft: "20px",
    marginRight: "20px",
  },
  button: {
    backgroundColor: Colors.BROWN_RED,
    margin: 10,
    padding: 10,
    maxWidth: 300,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
