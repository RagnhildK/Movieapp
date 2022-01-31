import React from "react";
import ResultMovie from "../../components/ResultMovie/ResultMovie";
import { Provider } from "react-native-paper";
import {
  setLoading,
  setTotalResults,
  addParticipant,
  resetResultScreen,
  sortTotalResults,
} from "../../redux/movieSlicer";
import {
  View,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getRatings } from "../../utils/firebase";
import { useEffect } from "react";
import * as Colors from "../../styles/colors";

export default function ResultScreen({ navigation }) {
  const { sessionID, participants, sortedIDs, loading } = useSelector(
    (state) => state.movieRatings
  );

  const dispatch = useDispatch();

  const handlePress = () => {
    dispatch(setLoading(true));
    getRatings(sessionID, handleResponse);
  };

  const handleResponse = (response) => {
    dispatch(resetResultScreen());
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
        {loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0000ff"
          />
        ) : (
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
    marginLeft: 20,
    marginRight: 20,
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
