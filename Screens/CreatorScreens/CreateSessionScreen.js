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
//import { registerUser } from "../../server.js";

export default function CreateSessionScreen({ navigation }) {
  const [username, setLocalUsername] = useState("");
  const [nmbMovies, setLocalNmbMovies] = useState("");
  const [userError, setUserError] = useState(false);

  const dispatch = useDispatch();

  const createSession = () => {
    dispatch(setNmbMovies(nmbMovies));
    // registerUser(username)
    if (true) {
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
    <View>
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
      <Button title="Start rating" onPress={() => createSession()} />
    </View>
  );
}
