import React from "react";
import { View, Button, Text } from "react-native";

// dispatch
// denne skjer i en loop så lenge personen er på denne siden 
// her skal getrating fra backend kalles
// ratings fra getratings må lagres i redux
// funksjonalitet for å regne ut hvor mange partiipants som har ratet og hvor mange som skal rate
// dispatch slutt

export default function WaitingScreen({ navigation }) {
  return (
    <View>
      <Text>number/number participants have finished their ratings</Text>
      <Text>Wait for other members or end session.</Text>
      <Button
        // denne buttonen skal ha businesslogikk som plusser og sorterer ratingsene. ratingsene er da allerede lagret i redux, fra når den kaller getratings
        title="End session and view results"
        onPress={() => navigation.navigate("ResultScreen")}
      />
    </View>
  );
}
