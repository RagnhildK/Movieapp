import React, {useState} from "react";
import { View, Button, TextInput, StyleSheet, Text } from "react-native";
import { useDispatch } from "react-redux";
import { setSessionID } from "../../redux/movieSlicer";

export default function JoinSessionScreen({ navigation }) {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const enterSession = () => {
    dispatch(setSessionID(input));
    // TODO only navigate to this one if there is a session with that sessionId, if not show error
    navigation.navigate("RatingScreen")
  };

  return (
    <View>
      <TextInput
        styles={styles.input}
        onChangeText={(val) => setInput(val)}
        value={input}
        placeholder="username of session creator..."
      />
      <Button
        title="This page should go to rating screen"
        onPress={() => enterSession()}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  input: {
    height: 40,
    margin: 12,
    borderWidth: 1,
    padding: 10,
  },
});
