import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Text,
} from "react-native";
import { Provider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../../components/Movie/Movie";
import { setLoading, addFetchedMovie } from "../../redux/movieSlicer";
import { getMovie } from "../../utils/fetch";
import * as Colors from "../../styles/colors";
import { updateRatings } from "../../utils/firebase";

const RatingScreen = ({ navigation }) => {
  const { movies, loading, username, sessionID, ratings } = useSelector(
    (state) => state.movieRatings,
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
            {Object.entries(movies).map((m) => (
              <Movie key={m[0]} id={m[0]} />
            ))}
          </ScrollView>
        )}
        {/* <View style={styles.bottom}> */}
        <Pressable style={styles.button} onPress={() => handleSubmit()}>
          <Text style={styles.buttonText}> Submit rating</Text>
        </Pressable>
        {/* </View> */}
      </View>
    </Provider>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
    marginLeft: 10,
    marginRight: 10,
  },
  loading: {
    flex: 8,
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

export default RatingScreen;
