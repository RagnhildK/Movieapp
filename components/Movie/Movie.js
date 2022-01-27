import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";


function Movie({ title, posterPath, overview }) {
  // Renders the movie that is passed as function input
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
      <Image style={{width: '20%', height: '5%'}} source={{uri: 'https://media.snl.no/media/162191/article_topimage_shutterstock_1029842671.jpg'}}></Image>
      <Text>{overview}</Text>
      <RatingButtons/>
    </View>
  );
}


export default Movie;