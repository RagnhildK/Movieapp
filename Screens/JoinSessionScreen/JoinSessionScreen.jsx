import React, { useState } from "react";
import { View, StyleSheet, Pressable, Text, SafeAreaView } from "react-native";
import { setSessionID, setUsername, setLoading } from "../../redux/movieSlicer";
import { addParticipant, getNmbOfMovies } from "../../utils/firebase";
import { useDispatch, useSelector } from "react-redux";
import { TextInput } from "react-native-paper";
import { Headline } from "react-native-paper";
import * as Colors from "../../styles/colors";

export default function JoinSessionScreen({ navigation }) {
  const [localSessionID, setLocalSessionID] = useState("");
  const [localUsername, setLocalUsername] = useState("");
  const [userError, setUserError] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  const { sessionID } = useSelector((state) => state.movieRatings);

  const dispatch = useDispatch();

  const handleResponse = (response) => {
    // response.results.map((m) => dispatch(addFetchedMovie(m)));
    // dispatch(setLoading(false));

    console.log(response.amount);
  };

  const enterSession = () => {
    const validUsername = localUsername != "" ? true : false;
    const validSession = localSessionID != "" ? true : false;
    if (!validUsername) {
      if (!validSession) {
        setUserError(true);
        setSessionError(true);
      } else {
        setUserError(true);
        setSessionError(false);
      }
    } else {
      if (!validSession) {
        setSessionError(true);
        setUserError(false);
      } else {
        dispatch(setLoading(true));
        dispatch(setUsername(localUsername));
        dispatch(setSessionID(localSessionID));
        addParticipant(localUsername, localSessionID);
        getNmbOfMovies(localSessionID, handleResponse);
        navigation.navigate("RatingScreen");
      }
    }
  };

  return (
    <View style={styles.container}>
      <SafeAreaView>
        <Headline style={styles.heading1}>What's your nickname?</Headline>
        <TextInput
          mode="outlined"
          error={userError}
          onChangeText={(val) => setLocalUsername(val)}
          value={localUsername}
          placeholder="Your nickname"
        />
        <Headline style={styles.heading2}>
          What's the name of the party?
        </Headline>
        <TextInput
          mode="outlined"
          error={sessionError}
          onChangeText={(val) => setLocalSessionID(val)}
          value={localSessionID}
          placeholder="Enter the name of the party"
        />
        <Pressable
          id="enterJoinedSession"
          style={styles.button}
          onPress={() => enterSession()}
        >
          <Text style={styles.buttonText}> Join party</Text>
        </Pressable>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: Colors.DARK_PURPLE,
    paddingLeft: 20,
    paddingRight: 20,
  },
  heading1: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    textAlign: "center",
    fontStyle: "italic",
  },
  heading2: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    marginTop: 40,
    textAlign: "center",
    fontStyle: "italic",
  },
  button: {
    backgroundColor: Colors.PURPLE,
    marginTop: 20,
    margin: 30,
    padding: 15,
    paddingHorizontal: 50,
    maxWidth: 250,
    borderRadius: 20,
    alignSelf: "center",
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: "center",
  },
});
