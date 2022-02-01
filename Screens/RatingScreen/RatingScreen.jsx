import React, { useEffect } from "react";
import {
  View,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
  Pressable,
  Text,
  SafeAreaView,
} from "react-native";
import { Headline, Provider } from "react-native-paper";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../../components/Movie/Movie";
import { setLoading, addFetchedMovie } from "../../redux/movieSlicer";
import { getMovie } from "../../utils/fetch";
import * as Colors from "../../styles/colors";
import { updateRatings } from "../../utils/firebase";

function RatingScreen({ navigation }) {
  const { movies, loading, username, sessionID, ratings, nmbMovies } =
    useSelector((state) => state.movieRatings);

  const dispatch = useDispatch();

  const handleResponse = (response) => {
    const sliced = response.slice(0, nmbMovies);
    // sliced.map((m) => dispatch(addFetchedMovie(m)));
    console.log(sliced.length)
    for (let i = 0; i < sliced.length; i++) {
      dispatch(addFetchedMovie(sliced[i]));
    } 
    dispatch(setLoading(false));
  };

  const handleSubmit = () => {
    updateRatings(username, ratings, sessionID);
    dispatch(setLoading(true));
    navigation.navigate("ResultScreen");
  };

  useEffect(() => {
    var integer = Math.floor(nmbMovies / 20);
    var remainder = nmbMovies % 20 == 0 ? 0 : 1;
    var pages = integer + remainder;
    getMovie(handleResponse, pages);
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
            <Headline style={styles.heading}>
              Vote for the movies you want to watch in {sessionID}
            </Headline>
            {Object.entries(movies).map((m) => (
              <Movie key={m[0]} id={m[0]} />
            ))}
          </ScrollView>
          <Pressable style={styles.button} onPress={() => handleSubmit()}>
            <Text style={styles.buttonText}> Submit rating</Text>
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
    paddingBottom: 5,
  },
  loading: {
    flex: 8,
  },
  button: {
    backgroundColor: Colors.PURPLE,
    margin: 10,
    paddingHorizontal: 50,
    padding: 15,
    maxWidth: 250,
    borderRadius: 20,
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
