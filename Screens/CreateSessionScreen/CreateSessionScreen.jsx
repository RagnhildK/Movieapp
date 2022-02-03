import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Pressable, Text, SafeAreaView, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Platform, Button } from "react-native";
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
  const [localMovieAmount, setLocalMovieAmount] = useState("");
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
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.container}
      >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView>
        <Headline style={styles.heading}>
          What's the name of the party?
        </Headline>
        <TextInput
          mode="outlined"
          error={sessionError}
          onChangeText={(val) => handleSessionID(val)}
          value={localSessionID}
          placeholder="Choose a name for the party"
        />
        <Headline style={styles.headingBottom}>
          How many movies to choose between?
        </Headline>
        <TextInput
          keyboardType="numeric"
          mode="outlined"
          error={amountError}
          onChangeText={(val) => handleAmount(val)}
          value={localMovieAmount}
          placeholder="Number of movies"
        />
        <Headline style={styles.headingBottom}>What's your nickname?</Headline>
        <TextInput
          mode="outlined"
          error={usernameError}
          onChangeText={(val) => handleUsername(val)}
          value={localUsername}
          placeholder="Your nickname"
        />
        <Pressable style={styles.button} onPress={() => createSession()}>
          <Text style={styles.buttonText}>Start the party</Text>
        </Pressable>
      </SafeAreaView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
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
  heading: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  headingBottom: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    marginTop: 40,
    textAlign: "center",
    fontStyle: "italic",
  },
});
