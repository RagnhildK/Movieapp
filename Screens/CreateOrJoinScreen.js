import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { setCreator } from "../redux/movieSlicer";
import { useDispatch } from "react-redux";
import { setSessionID } from "../redux/movieSlicer";

export default function CreateOrJoinScreen({ navigation }) {
  const dispatch = useDispatch();

  const handlePress = (user) => {
    navigation.navigate(user + "SessionScreen");
    dispatch(setCreator(user));
    dispatch(setSessionID(""));
  };

  return (
    <View style={styles.container}>
      <Button
        style={styles.button}
        title="Create a session"
        onPress={() => handlePress("Create")}
      />
      <Button
        style={styles.button}
        title="Join a session"
        onPress={() => handlePress("Join")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  button: { alignItems: "center", padding: "1rem" },
});
