import React from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
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
    <SafeAreaView style={styles.container}>
      <View style={styles.margin}>
      <Headline style={styles.headline}>
        Find the perfect movie to watch with friends
      </Headline>
      <View style={styles.padding}>
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
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DARK_PURPLE,
  },
  button: {
    backgroundColor: Colors.PURPLE,
    marginTop: 15,
    marginBottom: 10,
    margin: 30,
    padding: 15,
    maxWidth: 250,
    paddingHorizontal: 50,
    borderRadius: 20
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
    fontWeight: "normal",
  },
  headline: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 32,
    margin: 40,
    textAlign: "center",
    fontStyle: "italic",
  },
  padding: {
    marginTop: 70,
    alignSelf: "center"
  },
  margin: {
    margin: 20
  }
});
