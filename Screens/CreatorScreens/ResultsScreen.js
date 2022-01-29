import React from "react";
import { View, Button, StyleSheet } from "react-native";
import ResultMovie from "../../components/Movie/ResultMovie";
import { useSelector } from "react-redux";
import * as Colors from "../../styles/colors";

export default function ResultScreen({ navigation }) {
  const { movies } = useSelector((state) => state.movieRatings);
  return (
    <View style={styles.container}>
      {!!movies && (
        <View className="MoviesListed">
          <View>
            {Object.entries(movies).map((m) => (
              <ResultMovie key={m[0]} id={m[0]} />
            ))}
          </View>
        </View>
      )}
      <Button
        // denne knappen skal kalle deleteASession fra backend
        color={Colors.BROWN_RED}
        title="Go to start screen"
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
    marginLeft: "20px",
    marginRight: "20px",
  },
});
