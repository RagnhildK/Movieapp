import React from "react";
import { View, Button, Text } from "react-native";

export default function WaitingScreen({ navigation }) {
  return (
    <View>
      <Text>Wait for other members or end session.</Text>
      <Button
        title="This page should go to the resultsScreen"
        onPress={() => navigation.navigate("ResultScreen")}
      />
    </View>
  );
}