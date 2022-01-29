import React from "react";
import { View, Button, StyleSheet } from "react-native";
import * as Colors from "../../styles/colors";

export default function FinishedScreen({ navigation }) {
  return (
    <View style={styles.container}>
      <Button
        color={Colors.BROWN_RED}
        title="This page should go to the home createSessionScreen or joinsessionscreen"
        onPress={() => navigation.navigate("CreateOrJoinScreen")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.BEIGE,
  },
});
