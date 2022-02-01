import React, { useEffect } from "react";
import ResultMovie from "../../components/ResultMovie/ResultMovie";
import { Provider, Headline, Chip, IconButton } from "react-native-paper";
import {
  setLoading,
  setTotalResults,
  addParticipant,
  resetResultScreen,
  sortTotalResults,
} from "../../redux/movieSlicer";
import {
  View,
  ScrollView,
  StyleSheet,
  Pressable,
  Text,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import { getRatings } from "../../utils/firebase";

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
      {loading ? (
        <ActivityIndicator
          style={styles.container}
          size="large"
          color="#0000ff"
        />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.rowContainer}>
              <Headline style={styles.heading1}>
                Participants in {sessionID}:
              </Headline>
              <IconButton
                style={styles.refreshButton}
                icon="refresh"
                color={Colors.WHITE}
                onPress={() => handlePress()}
              />
            </View>
            <Text>
              {participants.map((i) => (
                <Chip key={i} disabled={true} style={styles.chip}>
                  <Text style={styles.genresText}>{i}</Text>
                </Chip>
              ))}
            </Text>
            <View>
              {sortedIDs.map(([id, _]) => (
                <ResultMovie key={id} id={id} />
              ))}
            </View>
          </ScrollView>
          <Pressable
            style={styles.button}
            onPress={() => navigation.navigate("CreateOrJoinScreen")}
          >
            <Text style={styles.buttonText}> Go to start screen</Text>
          </Pressable>
        </SafeAreaView>
      )}
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DARK_PURPLE,
    padding: 20,
  },
  rowContainer: {
    flexDirection: "row",
  },
  heading1: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    // margin: 30,
    // textAlign: 'center',
    fontStyle: "italic",
  },
  chip: {
    marginHorizontal: 4,
    maxHeight: 48,
    lineHeight: 10, //usikker på om denne trengs
    backgroundColor: Colors.PURPLE_LIGHT,
  },
  genresText: {
    // usikker på om dette trengs - må se mer på chips og hvorfor de tar så mye plass
    padding: 0,
    margin: 0,
    color: Colors.BLACK,
  },
  refreshButton: {
    backgroundColor: Colors.PURPLE,
    alignSelf: "center",
  },
  button: {
    alignSelf: "flex-end",
    backgroundColor: Colors.PURPLE,
    margin: 10,
    paddingHorizontal: 30,
    padding: 15,
    maxWidth: 200,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
