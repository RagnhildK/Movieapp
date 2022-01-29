import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { setCreator } from "../redux/movieSlicer";
import { useDispatch } from "react-redux";
import { setSessionID } from "../redux/movieSlicer";
import * as Colors from "../styles/colors";

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
        color={Colors.BROWN_RED}
        title="Create a session"
        onPress={() => handlePress("Create")}
      />
      <Button
        color={Colors.BROWN_RED}
        title="Join a session"
        onPress={() => handlePress("Join")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
    marginLeft: "20px",
    marginRight: "20px",
  },
});
