import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import { Headline, Title } from "react-native-paper";
import { useDispatch } from "react-redux";
import { setSessionID } from "../../redux/movieSlicer";
import * as Colors from "../../styles/colors";

export default function CreateOrJoinScreen({ navigation }) {
  const dispatch = useDispatch();
  const handlePress = (user) => {
    navigation.navigate(user + "SessionScreen");
    dispatch(setSessionID(""));
  };

  return (
    <View style={styles.container}>
      <View style={styles.col}>
        <Headline style={styles.headline}>
          Find the perfect movie to watch with friends
        </Headline>
      </View>
      <View>
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
    justifyContent: "space-evenly",
    backgroundColor: Colors.DARK_PURPLE,
    paddingLeft: 20,
    paddingRight: 20,
  },
  margin: {
    //   marginLeft: 20,
    //   marginRight: 20,
    //   justifyContent: "space-around",
  },
  button: {
    backgroundColor: Colors.PURPLE,
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
  headline: {
    color: Colors.WHITE,
    fontSize: 32,
  },
  col: {
    flexDirection: "col",
    alignItems: "center",
  },
});
