import React from "react";
import { View, Button } from "react-native";

function RatingButtons({ title, img, abstract }) {
  // Renders the movie that is passed as function input

  const handlePress = (rating) => {
    getMovie();
  };

  return (
    <View className="MovieItem">
      <Button onPress={() => console.log("YES")} title="0" />
      <Button onPress={() => console.log("NO")} title="1" />
      <Button onPress={() => console.log("YES")} title="2" />
      <Button onPress={() => console.log("YES")} title="3" />
      <Button onPress={() => console.log("YES")} title="4" />
      <Button onPress={() => console.log("YES")} title="5" />
    </View>
  );
}

export default RatingButtons;
