import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { setUsername, setNmbMovies, setLoading, setSessionID } from "../../redux/movieSlicer";
// import { registerUser } from "../../server.js";

export default function CreateSessionScreen({ navigation }) {
  const [username, setLocalUsername] = useState("");
  const [nmbMovies, setLocalNmbMovies] = useState("");

  const dispatch = useDispatch();

  const createSession = () => {
    dispatch(setNmbMovies(nmbMovies));
    // if (registerUser(username)) {
    if (true) {
      dispatch(setUsername(username));
      // createASession(username,)
      dispatch(setSessionID(username));
      navigation.navigate("RatingScreen");
      dispatch(setLoading(true));
    } else {
      // TODO: error message that username is not available
    }
  };

  return (
    <View>
      <TextInput
        styles={styles.input}
        onChangeText={(val) => setLocalUsername(val)}
        value={username}
        placeholder="Enter a username for the session..."
      />
      {/* TODO: check that it is only numbers */}
      <TextInput
        styles={styles.input}
        onChangeText={(val) => setLocalNmbMovies(val)}
        value={nmbMovies}
        keyboardType="numeric"
        placeholder="How many movies do you want to rank?..."
      />
      <Button title="Start rating" onPress={() => createSession()} />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
