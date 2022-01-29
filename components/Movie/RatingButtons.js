import React from "react";
import { View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rateMovie } from "../../redux/movieSlicer";
import { AirbnbRating } from "react-native-ratings";

function RatingButtons({ id }) {
  const { ratings } = useSelector((state) => state.movieRatings);
  const dispatch = useDispatch();

  const ratingCompleted = (rating) => {
    dispatch(rateMovie({ rating: rating, id: id }));
  };

  return (
    <View className="MovieItem">
      <AirbnbRating
        onFinishRating={(rating) => ratingCompleted(rating)}
        defaultRating={ratings[id]}
        reviews={["", "", "", "", ""]}
      />
    </View>
  );
}

export default RatingButtons;
