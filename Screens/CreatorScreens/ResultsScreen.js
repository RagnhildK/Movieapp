import React from "react";
import { View, Button } from "react-native";
import ResultMovie from "../../components/Movie/ResultMovie";
import { useSelector } from "react-redux";

export default function ResultScreen({navigation}) {
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
        title="This page should go to the start screen"
        onPress={() => navigation.navigate("CreateOrJoinScreen")}
      />
    </View>
  );
}
