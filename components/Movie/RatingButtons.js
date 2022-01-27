import React from "react";
import { View, Button } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rateMovie } from "../../redux/movieSlicer";
import { Rating } from "react-native-ratings";

function RatingButtons({ id }) {
  const { movies } = useSelector((state) => state.movieRatings);
  const dispatch = useDispatch();

  const handlePress = (rating) => {
    dispatch(rateMovie({ rating: rating, id: id }));
  };

  return (
    <View className="MovieItem">
      <Rating></Rating>
    </View>
  );
}

export default RatingButtons;
