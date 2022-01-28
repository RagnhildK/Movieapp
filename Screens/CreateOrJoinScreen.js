import React from "react";
import { View, Button, StyleSheet } from "react-native";
import { setCreator } from "../redux/movieSlicer";
import { useSelector, useDispatch } from "react-redux";
import { setSessionID } from "../redux/movieSlicer";

export default function CreateOrJoinScreen({ navigation }) {
  const { creator } = useSelector((state) => state.movieRatings);

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
        title="This page should go to create screen"
        onPress={() => handlePress("Create")}
      />
      <Button
        style={styles.button}
        title="This page should go to join screen"
        onPress={() => handlePress("Join")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center" },
  button: {alignItems: "center", padding: "1rem"},
});
