import React from "react";
import { View } from "react-native";
import ResultMovie from "../components/Movie/ResultMovie";
import { useSelector } from "react-redux";

export default function Result() {
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
    </View>
  );
}
