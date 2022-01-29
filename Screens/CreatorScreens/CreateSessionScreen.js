import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import { setUsername, setNmbMovies, setLoading } from "../../redux/movieSlicer";
//import { registerUser } from "../../server.js";

export default function CreateSessionScreen({ navigation }) {
  const [username, setLocalUsername] = useState("");
  const [nmbMovies, setLocalNmbMovies] = useState("");
  const [userError, setUserError] = useState(false);
  const [sessionError, setSessionError] = useState(true);

  const dispatch = useDispatch();

  const createSession = () => {
    dispatch(setUsername(username));
    dispatch(setNmbMovies(nmbMovies));
    // TODO
    //ask backend if the username is free, if free gets true back:
    // diplay error message if false
    // ask backend to create a session with the ids of the movies to rate
    // dispatch(setSessionID(username));
    navigation.navigate("RatingScreen");
    dispatch(setLoading(true));
  };

  return (
    <View>
      <TextInput
        mode="outlined"
        label="Username"
        error={userError}
        styles={styles.input}
        onChangeText={(val) => setLocalUsername(val)}
        value={username}
        placeholder="Enter a username for the session..."
      />
      {/* TODO: check that it is only numbers */}
      <TextInput
        mode="outlined"
        label="Number of movies"
        error={sessionError}
        styles={styles.input}
        onChangeText={(val) => setLocalNmbMovies(val)}
        value={nmbMovies}
        keyboardType="numeric"
        placeholder="How many movies do you want to choose between?"
      />
      <Button title="Start rating" onPress={() => createSession()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 700,
    margin: 20,
    borderWidth: 1,
    padding: 10,
  },
});
