import React from "react";
import { View, Text, StyleSheet, Pressable } from "react-native";
import * as Colors from "../../styles/colors";
import { getRatings } from "../../firebase";
import { useSelector } from "react-redux";

// dispatch
// denne skjer i en loop så lenge personen er på denne siden
// her skal getrating fra backend kalles
// ratings fra getratings må lagres i redux
// funksjonalitet for å regne ut hvor mange partiipants som har ratet og hvor mange som skal rate
// dispatch slutt

export default function WaitingScreen({ navigation }) {
  const { sessionID } = useSelector((state) => state.movieRatings);
  console.log("hei");

  const handlePress = () => {
    getRatings(sessionID);
    //TODO: store ratings in redux ?
    //lage en funskjon som kalkulerer ratingsene
    navigation.navigate("ResultScreen");
  };

  return (
    <View style={styles.container}>
      <Text>Wait for other members or end session.</Text>
      <Pressable
        // denne buttonen skal ha businesslogikk som plusser og sorterer ratingsene. ratingsene er da allerede lagret i redux, fra når den kaller getratings
        style={styles.button}
        onPress={() => handlePress()}
      >
        {" "}
        <Text style={styles.buttonText}> View results</Text>
      </Pressable>
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
