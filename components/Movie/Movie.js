import React from "react";
import { View, Text, Image } from "react-native";
import RatingButtons from "./RatingButtons";


<<<<<<< HEAD
function Movie({ title, img, overview, posterPath }) {
=======
function Movie({ title, posterPath, overview }) {
>>>>>>> origin/Skeleton
  // Renders the movie that is passed as function input
  let url = 'https://image.tmdb.org/t/p/w500/' + posterPath
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
<<<<<<< HEAD
      <Image style={{width: 200, height: 300}} source={{uri: url}}></Image>
=======
      <Image style={{width: '20%', height: '5%'}} source={{uri: 'https://media.snl.no/media/162191/article_topimage_shutterstock_1029842671.jpg'}}></Image>
>>>>>>> origin/Skeleton
      <Text>{overview}</Text>
      <RatingButtons/>
    </View>
  );
}


export default Movie;