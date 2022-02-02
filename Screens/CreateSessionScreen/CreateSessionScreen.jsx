import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import { TextInput, Headline } from "react-native-paper";
import {
  setUsername,
  setLoading,
  setSessionID,
  setNmbMovies,
} from "../../redux/movieSlicer";
import * as Colors from "../../styles/colors";
import { addSession } from "../../utils/firebase";

export default function CreateSessionScreen({ navigation }) {
  const [localUsername, setLocalUsername] = useState("");
  const [localSessionID, setLocalSessionID] = useState("");
  const [localMovieAmount, setLocalMovieAmount] = useState(20);
  const [usernameError, setUsernameError] = useState(false);
  const [sessionError, setSessionError] = useState(false);
  const [amountError, setAmountError] = useState(false);

  const dispatch = useDispatch();

  const createSession = () => {
    const unvalidUsername = localUsername == "";
    const unvalidSession = localSessionID == "";
    const unvalidAmount = isNaN(localMovieAmount);

    setUsernameError(unvalidUsername);
    setSessionError(unvalidSession);
    setAmountError(unvalidAmount);

    if (!unvalidUsername && !unvalidSession && !unvalidAmount) {
      dispatch(setUsername(localUsername));
      dispatch(setSessionID(localSessionID));
      dispatch(setNmbMovies(localMovieAmount));
      dispatch(setLoading(true));
      addSession(localUsername, localSessionID, localMovieAmount);
      navigation.navigate("RatingScreen");
    }
  };

  const handleUsername = (val) => {
    setUsernameError(false);
    setLocalUsername(val);
  };

  const handleSessionID = (val) => {
    setSessionError(false);
    setLocalSessionID(val);
  };

  const handleAmount = (val) => {
    setAmountError(false);
    setLocalMovieAmount(val);
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Headline style={styles.heading1}>What's your nickname?</Headline>
        <TextInput
          mode="outlined"
          error={usernameError}
          onChangeText={(val) => handleUsername(val)}
          value={localUsername}
          placeholder="Your nickname"
        />
        <Headline style={styles.heading2}>
          What's the name of the party?
        </Headline>
        <TextInput
          mode="outlined"
          error={sessionError}
          onChangeText={(val) => handleSessionID(val)}
          value={localSessionID}
          placeholder="Choose a name for the party"
        />
        <Headline style={styles.heading2}>
          How many movies to choose between?
        </Headline>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          onChangeText={(val) => handleAmount(val)}
          value={localMovieAmount}
          placeholder="Number of movies"
        />
        <Pressable style={styles.button} onPress={() => createSession()}>
          <Text style={styles.buttonText}>Start a party</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DARK_PURPLE,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    backgroundColor: Colors.PURPLE,
    marginTop: 20,
    margin: 30,
    padding: 15,
    paddingHorizontal: 50,
    maxWidth: 250,
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
  heading1: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  heading2: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    marginTop: 40,
    textAlign: "center",
    fontStyle: "italic",
  },
});
