import React from "react";
import { View, Button } from "react-native";
import { setCreator } from "../redux/movieSlicer";
import { useSelector, useDispatch } from "react-redux";

export default function CreateOrJoinScreen({ navigation }) {
  const { creator } = useSelector((state) => state.movieRatings);

  const dispatch = useDispatch();

  const handlePress = (user) => {
    navigation.navigate(user + "SessionScreen");
    dispatch(setCreator(user));
  };

  return (
    <View>
      <Button
        title="This page should go to create screen"
        onPress={() => handlePress("Create")}
      />
      <Button
        title="This page should go to join screen"
        onPress={() => handlePress("Join")}
      />
    </View>
  );
}
