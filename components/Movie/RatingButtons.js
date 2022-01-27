import React from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { addRatedMovie } from "../../redux/movie";

function RatingButtons({ title, poster_path, id }) {
  // Renders the movie that is passed as function input
  const { ratedMovies } = useSelector((state) => state.movieRatings);
  const dispatch = useDispatch();

  const handlePress = (rating) => {
    const movie = {
      id: id,
      title: title,
      poster_path: poster_path,
      rating: rating,
    };

    dispatch(addRatedMovie(movie));
  };
  console.log(ratedMovies);
  return (
    <View className="MovieItem">
      <Button onPress={() => handlePress(0)} title="0" />
      <Button onPress={() => handlePress(1)} title="1" />
      <Button onPress={() => handlePress(2)} title="2" />
      <Button onPress={() => handlePress(3)} title="3" />
      <Button onPress={() => handlePress(4)} title="4" />
      <Button onPress={() => handlePress(5)} title="5" />
    </View>
  );
}

export default RatingButtons;
