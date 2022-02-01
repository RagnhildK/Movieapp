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
      <Headline style={styles.headline}>
        Find the perfect movie to watch with friends
      </Headline>
      <View>
        <Pressable style={styles.button} onPress={() => handlePress("Create")}>
          <Text style={styles.buttonText}> Start a movie party</Text>
        </Pressable>
        <Pressable
          style={styles.button}
          title="Join a session"
          onPress={() => handlePress("Join")}
        >
          <Text style={styles.buttonText}>Join a movie party</Text>
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
  button: {
    backgroundColor: Colors.PURPLE,
    margin: 10,
    padding: 10,
    borderRadius: 10,
    alignSelf: "auto",
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "normal",
  },
  headline: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 32,
    margin: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
});
