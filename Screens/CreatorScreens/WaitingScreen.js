import React from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import * as Colors from "../../styles/colors";

// dispatch
// denne skjer i en loop så lenge personen er på denne siden
// her skal getrating fra backend kalles
// ratings fra getratings må lagres i redux
// funksjonalitet for å regne ut hvor mange partiipants som har ratet og hvor mange som skal rate
// dispatch slutt

export default function WaitingScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>number/number participants have finished their ratings</Text>
      <Text>Wait for other members or end session.</Text>
      <Button
        color={Colors.BROWN_RED}
        // denne buttonen skal ha businesslogikk som plusser og sorterer ratingsene. ratingsene er da allerede lagret i redux, fra når den kaller getratings
        title="End session and view results"
        onPress={() => navigation.navigate("ResultScreen")}
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
