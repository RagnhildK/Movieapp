import React from "react";
import { View, Button } from "react-native";

function RatingButtons({ title, img, abstract }) {
  // Renders the movie that is passed as function input

  const handlePress = (rating) => {
    
  };

  return (
    <View className="MovieItem">
      <Button onPress={()=>handlePress(0)} title="0" />
      <Button onPress={()=>handlePress(1)} title="1" />
      <Button onPress={()=>handlePress(2)} title="2" />
      <Button onPress={()=>handlePress(3)} title="3" />
      <Button onPress={()=>handlePress(4)} title="4" />
      <Button onPress={()=>handlePress(5)} title="5" />
    </View>
  );
}

export default RatingButtons;
