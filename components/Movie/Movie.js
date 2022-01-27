import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";


function Movie({ title, poster_path, overview, id }) {
  // Renders the movie that is passed as function input
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
      <Image style={{width: '20%', height: '5%'}} source={{uri: 'https://media.snl.no/media/162191/article_topimage_shutterstock_1029842671.jpg'}}></Image>
      <Text>{overview}</Text>
      <RatingButtons title={title} poster_path={poster_path} id={id}/>
    </View>
  );
}


export default Movie;