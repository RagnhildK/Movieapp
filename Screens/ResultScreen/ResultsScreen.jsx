import React, { useEffect } from "react";
import ResultMovie from "../../components/ResultMovie/ResultMovie";
import {
  Provider,
  Headline,
  Chip,
  IconButton,
  Divider,
} from "react-native-paper";
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
  const { sessionID, participants, sortedIDs, loading, movies } = useSelector(
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
            color="PURPLE_LIGHT"
          />
      ) : (
        <SafeAreaView style={styles.container}>
          <ScrollView>
            <View style={styles.headerContainer}>
              <View style={styles.rowContainer}>
                <Headline style={styles.heading1}>
                  Participants in {sessionID}
                </Headline>
                <IconButton
                  style={styles.refreshButton}
                  icon="refresh"
                  color={Colors.WHITE}
                  onPress={() => handlePress()}
                />
              </View>
              <View style={styles.chipSpacing}>
                {participants.map((i) => (
                  <Chip key={i} disabled={true} style={styles.chip}>
                    <Text style={styles.genresText}>{i}</Text>
                  </Chip>
                ))}
              </View>
              {/* <Divider style={styles.divider}/> */}
              <Headline style={styles.heading2}>
                Results from the voting
              </Headline>
            </View>
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
  headerContainer: {
    justifyContent: "flex-start",
    marginHorizontal: 10,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
  },
  heading1: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 26,
    fontStyle: "italic",
    alignSelf: "center",
  },
  refreshButton: {
    backgroundColor: Colors.PURPLE,
    alignSelf: "flex-end",
    // marginRight: 20
  },
  heading2: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 26,
    fontStyle: "italic",
    marginTop: 10,
  },
  divider: {
    backgroundColor: Colors.ORANGE_LIGHT,
    height: 1,
  },
  chipSpacing: {
    flexDirection: "row",
    flexWrap: "wrap",
  },
  chip: {
    marginBottom: 4,
    marginRight: 4,
    maxHeight: 25,
    // lineHeight: 10, //usikker på om denne trengs
    backgroundColor: Colors.PURPLE_LIGHT,
  },
  genresText: {
    // usikker på om dette trengs - må se mer på chips og hvorfor de tar så mye plass
    padding: 0,
    margin: 0,
    color: Colors.BLACK,
  },
  button: {
    alignSelf: "center",
    backgroundColor: Colors.PURPLE,
    margin: 10,
    paddingHorizontal: 50,
    padding: 15,
    maxWidth: 250,
    borderRadius: 20,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
