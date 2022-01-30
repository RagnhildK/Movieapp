import React from "react";
import { View, StyleSheet, Pressable, Text } from "react-native";
import ResultMovie from "../../components/Movie/ResultMovie";
import { useSelector } from "react-redux";
import * as Colors from "../../styles/colors";
import { ScrollView } from "react-native-gesture-handler";

export default function ResultScreen({ navigation }) {
  const { movies } = useSelector((state) => state.movieRatings);
  return (
    <View style={styles.container}>
      {!!movies && (
        <View className="MoviesListed">
          <ScrollView>
            {Object.entries(movies).map((m) => (
              <ResultMovie key={m[0]} id={m[0]} />
            ))}
          </ScrollView>
        </View>
      )}
      <Pressable
        // denne knappen skal kalle deleteASession fra backend
        style={styles.button}
        onPress={() => navigation.navigate("CreateOrJoinScreen")}
      >
        <Text style={styles.buttonText}> Go to start screen</Text>
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
