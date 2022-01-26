import React from "react";
import { StyleSheet, Text, View, Button} from "react-native";


export default function SignUp({navigation}) {
  return (
    <View>
      <Button
        title="Already have a user? Sign in"
        onPress={() => navigation.navigate("Sign in")}
      />
    </View>
  );
}
