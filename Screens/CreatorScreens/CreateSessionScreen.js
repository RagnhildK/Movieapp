import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { setUsername, setNmbMovies, setLoading } from "../../redux/movieSlicer";

export default function CreateSessionScreen({ navigation }) {
  const [username, setLocalUsername] = useState("");
  const [nmbMovies, setLocalNmbMovies] = useState("");

  const dispatch = useDispatch();

  const createSession = () => {
    dispatch(setUsername(username));
    dispatch(setNmbMovies(nmbMovies));
    // TODO
    //ask backend if the username is free, if free gets true back:
    // diplay error message if false
    // ask backend to create a session with the number of movies if true
    // dispatch(setSessionID(username));
    navigation.navigate("RatingScreen");
    dispatch(setLoading(true));
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
      <Button
        title="Start rating"
        onPress={() => createSession()}
      />
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
