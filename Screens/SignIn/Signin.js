import React from "react";
import {View, Button} from "react-native";


export default function SignIn({navigation}) {
  return (
    <View>
      <Button
        title="Don't have an account? Sign up here"
        onPress={() => navigation.navigate("Sign up")}
      />
    </View>
  );
}
