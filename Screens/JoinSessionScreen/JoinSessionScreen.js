import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID, setUsername, setLoading } from "../../redux/movieSlicer";
import { TextInput } from "react-native-paper";
import * as Colors from "../../styles/colors";
import { addParticipant } from "../../firebase";

export default function JoinSessionScreen({ navigation }) {
  const [localSessionID, setLocalSessionID] = useState("");
  const [localUsername, setLocalUsername] = useState("");
  const [userError, setUserError] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  const dispatch = useDispatch();

  const enterSession = () => {
    const validUsername = localUsername != "" ? true : false;
    const validSession = localSessionID != "" ? true : false;
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
        dispatch(setUsername(localUsername));
        dispatch(setSessionID(localSessionID));
        dispatch(setLoading(true));
        addParticipant(localUsername, localSessionID);
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
        value={localUsername}
        placeholder="Enter a username for the session..."
      />
      <TextInput
        mode="outlined"
        label="Username of session creator"
        error={sessionError}
        onChangeText={(val) => setLocalSessionID(val)}
        value={localSessionID}
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
