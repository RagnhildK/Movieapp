import React, { useState } from "react";
import { View, Button, TextInput, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID, setUsername, setLoading } from "../../redux/movieSlicer";
// import { registerUser, joinASession } from "../../server";

export default function JoinSessionScreen({ navigation }) {
  const [input, setInput] = useState("");
  const [username, setLocalUsername] = useState("");

  const dispatch = useDispatch();

  const enterSession = () => {
    // const validUserName = registerUser(username);
    // const validSession = joinASession(username, input);
    if (!validUserName) {
      if (!validSession) {
        //TODO: error message that username is not available
        //TODO: error message that there is no session for that username
      } else {
        // TODO: error message that username is not available
      }
    } else {
      if (!validSession) {
        //TODO: error message that there is no session for that username
      } else {
        dispatch(setUsername(username));
        dispatch(setSessionID(username));
        dispatch(setLoading(true));
        navigation.navigate("RatingScreen");
      }
    }
  };

  // // if (registerUser(username)) {
  // if (true) {
  //   dispatch(setUsername(username));
  //   // if (joinASession(username, input){ TODO make the function return true or false
  //   if (true) {
  //     dispatch(setSessionID(username));
  //     dispatch(setLoading(true));
  //     navigation.navigate("RatingScreen");
  //   }
  //   else{
  //     // TODO: error message that there is no session for that username
  //   }
  // } else {
  //   // TODO: error message that username is not available
  // }

  return (
    <View>
      <TextInput
        styles={styles.input}
        onChangeText={(val) => setLocalUsername(val)}
        value={username}
        placeholder="Enter a username for the session..."
      />
      <TextInput
        styles={styles.input}
        onChangeText={(val) => setInput(val)}
        value={input}
        placeholder="username of session creator..."
      />
      <Button
        title="This page should go to rating screen"
        onPress={() => enterSession()}
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
