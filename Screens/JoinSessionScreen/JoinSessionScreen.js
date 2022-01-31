import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID, setUsername, setLoading } from "../../redux/movieSlicer";
import { TextInput } from "react-native-paper";
import * as Colors from "../../styles/colors";
import { addParticipant } from "../../firebase";

export default function JoinSessionScreen({ navigation }) {
  const [owner, setOwner] = useState("");
  const [username, setLocalUsername] = useState("");
  const [userError, setUserError] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  const dispatch = useDispatch();

  const enterSession = () => {
    const validUsername = username != "" ? true : false;
    const validSession = owner != "" ? true : false;
    if (!validUsername) {
      if (!validSession) {
        setUserError(true);
        setSessionError(true);
      } else {
        setUserError(true);
        setSessionError(false);
      }
    } else {
      if (!validSession) {
        setSessionError(true);
        setUserError(false);
      } else {
        dispatch(setUsername(username));
        dispatch(setSessionID(owner));
        dispatch(setLoading(true));
        addParticipant(username, owner);
        navigation.navigate("RatingScreen");
      }
    }
  };

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
        onChangeText={(val) => setOwner(val)}
        value={owner}
        placeholder="username of session creator..."
      />
      <Pressable style={styles.button} onPress={() => enterSession()}>
        <Text style={styles.buttonText}> Start rating</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
  },
  button: {
    backgroundColor: Colors.BROWN_RED,
    margin: 10,
    padding: 10,
    maxWidth: 300,
    borderRadius: 15,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
