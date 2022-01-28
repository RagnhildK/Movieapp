import React from "react";
import { View, Button } from "react-native";

export default function CreateSessionScreen({ navigation }) {
  return (
    <View>
      <Button
        title="This page should go to rating screen"
        onPress={() => navigation.navigate("RatingScreen")}
      />
    </View>
  );
}