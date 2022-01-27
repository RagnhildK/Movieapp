import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";


function Movie({ title, poster_path, overview, id }) {
  // Renders the movie that is passed as function input
  let url = 'https://image.tmdb.org/t/p/w500/' + posterPath
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
      <Image style={{width: 200, height: 300}} source={{uri: url}}></Image>
      <Text>{overview}</Text>
      <RatingButtons title={title} poster_path={poster_path} id={id}/>
    </View>
  );
}


export default Movie;