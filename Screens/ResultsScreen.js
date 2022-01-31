import React from "react";
import ResultMovie from "../components/Movie/ResultMovie";
import { Provider } from "react-native-paper";
import {
  setLoading,
  setTotalResults,
  addParticipant,
  resetParticipants,
  sortTotalResults,
} from "../redux/movieSlicer";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getRatings } from "../firebase";
import { useEffect } from "react";
import * as Colors from "../styles/colors";

export default function ResultScreen({ navigation }) {
  const { movies, sessionID, participants, sortedIDs } = useSelector(
    (state) => state.movieRatings,
  );

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setLoading(true));
    dispatch(resetParticipants);
    getRatings(sessionID, handleResponse);
  };

  const handleResponse = (response) => {
    dispatch(resetParticipants());
    setTotalResults;
    //TODO: we need to resetTotalResults
    for (let user in response) {
      let userRatings = response[user];
      dispatch(addParticipant(user));
      for (let movieId in userRatings) {
        let rating = userRatings[movieId];
        dispatch(setTotalResults({ movieId: movieId, rating: rating }));
      }
    }
    dispatch(sortTotalResults());
    dispatch(setLoading(false));
  };

  useEffect(() => {
    getRatings(sessionID, handleResponse);
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        <Text>{participants} participants in this session</Text>
        <Pressable style={styles.button} onPress={() => handlePress()}>
          <Text style={styles.buttonText}> Refresh results</Text>
        </Pressable>
        {sortedIDs.length > 1 && (
          <View className="MoviesListed">
            <View>
              {sortedIDs.map(([id, _]) => (
                <ResultMovie key={id} id={id} />
              ))}
            </View>
          </View>
        )}
        <Pressable
          style={styles.button}
          onPress={() => navigation.navigate("CreateOrJoinScreen")}
        >
          <Text style={styles.buttonText}> Go to start screen</Text>
        </Pressable>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
    marginLeft: 10,
    marginRight: 10,
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
