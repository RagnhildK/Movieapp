import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, Button, StyleSheet } from "react-native";
import { TextInput } from "react-native-paper";
import {
  setUsername,
  setNmbMovies,
  setLoading,
  setSessionID,
} from "../../redux/movieSlicer";
import * as Colors from "../../styles/colors";
import { registerUser } from "../../server.js";

export default function CreateSessionScreen({ navigation }) {
  const [username, setLocalUsername] = useState("");
  const [nmbMovies, setLocalNmbMovies] = useState("");
  const [userError, setUserError] = useState(false);

  const dispatch = useDispatch();

  const createSession = () => {
    dispatch(setNmbMovies(nmbMovies));
    //registerUser(username)
    if (registerUser(username)) {
      dispatch(setUsername(username));
      // createASession(username,)
      dispatch(setSessionID(username));
      navigation.navigate("RatingScreen");
      dispatch(setLoading(true));
    } else {
      setUserError(true);
    }
  };
  const updateUsernameInput = (val) => {
    setUserError(false);
    setLocalUsername(val);
  };

  return (
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Username"
        error={userError}
        onChangeText={(val) => updateUsernameInput(val)}
        value={username}
        placeholder="Enter a username for the session..."
      />
      {/* TODO: check that it is only numbers */}
      <TextInput
        mode="outlined"
        label="Number of movies"
        onChangeText={(val) => setLocalNmbMovies(val)}
        value={nmbMovies}
        keyboardType="numeric"
        placeholder="How many movies do you want to choose between?"
      />
      <Button
        color={Colors.BROWN_RED}
        title="Start rating"
        onPress={() => createSession()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
    marginLeft: "20px",
    marginRight: "20px",
  },
});
