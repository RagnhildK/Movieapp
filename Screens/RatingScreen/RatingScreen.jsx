import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { Headline, Provider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../../components/Movie/Movie";
import { setLoading, addFetchedMovie } from "../../redux/movieSlicer";
import { getMovie } from "../../utils/fetch";
import * as Colors from "../../styles/colors";
import { updateRatings } from "../../utils/firebase";

function RatingScreen({ navigation }) {
  const { movies, loading, username, sessionID, ratings } = useSelector(
    (state) => state.movieRatings
  );

  const dispatch = useDispatch();

  const handleResponse = (response) => {
    response.results.map((m) => dispatch(addFetchedMovie(m)));
    dispatch(setLoading(false));
  };

  const handleSubmit = () => {
    updateRatings(username, ratings, sessionID);
    dispatch(setLoading(true));
    navigation.navigate("ResultScreen");
  };

  useEffect(() => {
    getMovie(handleResponse);
  }, []);

  return (
    <Provider>
      <View style={styles.container}>
        {loading ? (
          <ActivityIndicator
            style={styles.loading}
            size="large"
            color="#0000ff"
          />
        ) : (
          <ScrollView>
            <Headline style={styles.heading}>
              Vote for the movies you want to watch
            </Headline>
            {Object.entries(movies).map((m) => (
              <Movie key={m[0]} id={m[0]} />
            ))}
          </ScrollView>
        )}
        <Pressable style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}> Submit rating</Text>
        </Pressable>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DARK_PURPLE,
    paddingBottom: 5,
  },
  loading: {
    flex: 8,
  },
  button: {
    backgroundColor: Colors.PURPLE,
    margin: 10,
    paddingHorizontal: 30,
    padding: 15,
    maxWidth: 200,
    borderRadius: 10,
    alignSelf: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontSize: 18,
  },
  heading: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 25,
    margin: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
});

export default RatingScreen;
