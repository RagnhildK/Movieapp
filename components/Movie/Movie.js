import React from "react";

function Movie({ title, img, info }) {
  // Renders the movie that is passed as function input
  return (
    <View className="MovieItem">
      <Text>{title}</Text>
      <Image source={img} />
      <Text>{info}</Text>
    </View>
  );
}
