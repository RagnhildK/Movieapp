import React from "react";
import { View, Text, Image } from "react-native";

function ResultMovie({title, posterPath}) {
    let url = 'https://image.tmdb.org/t/p/w500/' + posterPath
    return (
      <View className="MovieItem">
        <Text>{title}</Text>
        <Image style={{width: 200, height: 300}} source={{uri: url}}></Image>
      </View>
    );
  }
  
  
  export default ResultMovie;
