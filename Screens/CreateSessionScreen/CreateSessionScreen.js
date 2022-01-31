import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { TextInput } from "react-native-paper";
import { setUsername, setLoading, setSessionID } from "../../redux/movieSlicer";
import * as Colors from "../../styles/colors";
import { addSession } from "../../firebase";

export default function CreateSessionScreen({ navigation }) {
  const [username, setLocalUsername] = useState("");
  const [userError, setUserError] = useState(false);

  const dispatch = useDispatch();

  const createSession = () => {
    const validUsername = username != "" ? true : false;
    if (validUsername) {
      dispatch(setUsername(username));
      addSession(username, [1, 2, 3, 4]);
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
      <Pressable style={styles.button} onPress={() => createSession()}>
        <Text style={styles.buttonText}> Create a session</Text>
      </Pressable>
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
    margin: 10,
    padding: 10,
    maxWidth: 300,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
