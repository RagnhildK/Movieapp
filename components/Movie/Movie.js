import React from "react";
import { View, Text } from "react-native";
import RatingButtons from "./RatingButtons";


function Movie({ title, img, overview }) {
  // Renders the movie that is passed as function input
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
      {/* <Image source={img} /> */}
      <Text>{overview}</Text>
      <RatingButtons/>
    </View>
  );
}


export default Movie;