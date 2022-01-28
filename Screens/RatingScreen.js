import React, { useEffect } from "react";
import {
  View,
  Button,
  ScrollView,
  ActivityIndicator,
  StyleSheet,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import Movie from "../components/Movie/Movie";
import { addFetchedMovie, setLoading } from "../redux/movieSlicer";
import { getMovie } from "../utils/fetch";

const RatingScreen = ({ navigation }) => {
  const { movies, creator, loading } = useSelector(
    (state) => state.movieRatings
  );

  const dispatch = useDispatch();

  const handleResponse = (response) => {
    response.results.map((m) => dispatch(addFetchedMovie(m)));
    dispatch(setLoading(false));
  };

  const handleSubmit = () => {
    // TODO send rating info to the backend

    if (creator) {
      navigation.navigate("WaitingScreen");
    } else {
      navigation.navigate("FinishedScreen");
    }
  };

  useEffect(() => {
    getMovie(handleResponse);
  }, []);

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator
          style={styles.loading}
          size="large"
          color="#0000ff"
        />
      ) : (
        <ScrollView>
          <View>
            {Object.entries(movies).map((m) => (
              <Movie key={m[0]} id={m[0]} />
            ))}
          </View>
        </ScrollView>
      )}
      <View style={styles.bottom}>
        <Button title="Submit ratings" onPress={() => handleSubmit()} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  loading: {
    flex: 8,
  },
  bottom: {
    flex: 1,
    justifyContent: "flex-end",
    marginBottom: 36,
  },
});

export default RatingScreen;
