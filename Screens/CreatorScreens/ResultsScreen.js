import React from "react";
import { View, Button } from "react-native";
import ResultMovie from "../../components/Movie/ResultMovie";
import { useSelector } from "react-redux";

export default function ResultScreen({ navigation }) {
  const { movies } = useSelector((state) => state.movieRatings);
  return (
    <View>
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
        title="Go to start screen"
        onPress={() => navigation.navigate("CreateOrJoinScreen")}
      />
    </View>
  );
}
