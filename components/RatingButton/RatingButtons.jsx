import React from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import { rateMovie } from "../../redux/movieSlicer";
import { AirbnbRating } from "react-native-ratings";
import { Colors } from "../../styles/colors";

function RatingButtons({ id }) {
  const { ratings } = useSelector((state) => state.movieRatings);
  const dispatch = useDispatch();

  const ratingCompleted = (rating) => {
    dispatch(rateMovie({ rating: rating, id: id }));
  };

  return (
    <View style={styles.movieRating}>
      <AirbnbRating
        onFinishRating={(rating) => ratingCompleted(rating)}
        defaultRating={ratings[id]}
        showRating={false}
        size={25}
      />
    </View>
  );
}
const styles = StyleSheet.create({
  movieRating: {
    flex: 1,
    justifyContent: "center",
  },
});

export default RatingButtons;
