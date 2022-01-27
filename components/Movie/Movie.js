import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";


function Movie({ title, img, overview, posterPath }) {
  // Renders the movie that is passed as function input
  let url = 'https://image.tmdb.org/t/p/w500/' + posterPath
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
      <Image style={{width: 200, height: 300}} source={{uri: url}}></Image>
      <Text>{overview}</Text>
      <RatingButtons/>
    </View>
  );
}


export default Movie;