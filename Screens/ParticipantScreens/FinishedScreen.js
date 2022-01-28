import React from "react";
import { View, Button } from "react-native";

export default function FinishedScreen({ navigation }) {
  return (
    <View>
      <Button
        title="This page should go to the home createSessionScreen or joinsessionscreen"
        onPress={() => navigation.navigate("CreateOrJoinScreen")}
      />
    </View>
  );
}