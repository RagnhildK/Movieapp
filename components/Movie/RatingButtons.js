import React from "react";
import { View, Button } from "react-native";


function RatingButtons({ title, img, abstract }) {
  // Renders the movie that is passed as function input
  return (
    <View className="MovieItem">
      <Button onPress={()=>console.log("NO")} title="Dislike" />
      <Button onPress={()=>console.log("YES")} title="Like" />
    </View>
  );
}


export default RatingButtons;