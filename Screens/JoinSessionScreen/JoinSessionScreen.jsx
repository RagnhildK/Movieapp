import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID, setUsername, setLoading } from "../../redux/movieSlicer";
import { TextInput } from "react-native-paper";
import * as Colors from "../../styles/colors";
import { addParticipant } from "../../utils/firebase";
import { Headline } from "react-native-paper";

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
    <SafeAreaView style={styles.container}>
      <Headline style={styles.heading1}>What's your nickname?</Headline>
      <TextInput
        mode="outlined"
        label="Nickname"
        error={userError}
        onChangeText={(val) => setLocalUsername(val)}
        value={localUsername}
        placeholder="Enter a nickname for the session..."
      />
      <Headline style={styles.heading2}>What's the name of the party?</Headline>
      <TextInput
        mode="outlined"
        label="Name of movie party"
        error={sessionError}
        onChangeText={(val) => setLocalSessionID(val)}
        value={localSessionID}
        placeholder="Enter a name for the party..."
      />
      <Pressable
        id="enterJoinedSession"
        style={styles.button}
        onPress={() => enterSession()}
      >
        <Text style={styles.buttonText}> Join party</Text>
      </Pressable>
    </SafeAreaView>
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
  button: {
    backgroundColor: Colors.PURPLE,
    marginTop: 20,
    margin: 10,
    padding: 10,
    maxWidth: 150,
    borderRadius: 10,
    alignSelf:"flex-end"

  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
