import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID } from "../redux/movieSlicer";
import * as Colors from "../styles/colors";

export default function CreateOrJoinScreen({ navigation }) {
  const dispatch = useDispatch();
  const handlePress = (user) => {
    navigation.navigate(user + "SessionScreen");
    dispatch(setSessionID(""));
  };

  return (
    <View style={styles.container}>
      <View style={styles.margin}>
        <Pressable style={styles.button} onPress={() => handlePress("Create")}>
          <Text style={styles.buttonText}> Create a session</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          title="Join a session"
          onPress={() => handlePress("Join")}
        >
          <Text style={styles.buttonText}>Join a session</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE_ROSE,
  },
  margin: {
    marginLeft: 20,
    marginRight: 20,
  },
  button: {
    backgroundColor: Colors.BROWN_DARK,
    margin: 10,
    padding: 10,
    borderRadius: 15,
    alignSelf: "auto",
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "normal",
  },
});
