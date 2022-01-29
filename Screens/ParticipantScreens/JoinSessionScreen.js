import React, { useState } from "react";
import { View, Button, StyleSheet } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID, setUsername, setLoading } from "../../redux/movieSlicer";
import { TextInput } from "react-native-paper";
import * as Colors from "../../styles/colors";
import { addParticipant } from "../../firebase";

export default function JoinSessionScreen({ navigation }) {
  const [owner, setowner] = useState("");
  const [username, setLocalUsername] = useState("");
  const [userError, setUserError] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  const dispatch = useDispatch();

  const enterSession = () => {
    //TODO deal med å lage sjekk for valid session
    const validUserName = true;
    const validSession = true;
    if (!validUserName) {
      if (!validSession) {
        setUserError(true);
        setSessionError(true);
      } else {
        setUserError(true);
      }
    } else {
      if (!validSession) {
        setSessionError(true);
      } else {
        dispatch(setUsername(username));
        dispatch(setSessionID(owner));
        dispatch(setLoading(true));
        addParticipant(username, owner);
        navigation.navigate("RatingScreen");
      }
    }
  };

  // // if (registerUser(username)) {
  // if (true) {
  //   dispatch(setUsername(username));
  //   // if (joinASession(username, owner){ TODO make the function return true or false
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
    <View style={styles.container}>
      <TextInput
        mode="outlined"
        label="Username"
        error={userError}
        onChangeText={(val) => setLocalUsername(val)}
        value={username}
        placeholder="Enter a username for the session..."
      />
      <TextInput
        mode="outlined"
        label="Username of session creator"
        error={sessionError}
        onChangeText={(val) => setInput(val)}
        value={owner}
        placeholder="username of session creator..."
      />
      <Button
        color={Colors.BROWN_RED}
        title="Start rating"
        onPress={() => enterSession()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
  },
});
