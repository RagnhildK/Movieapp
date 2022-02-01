import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  View, StyleSheet, Pressable, Text,
} from 'react-native';
import { TextInput, Headline } from 'react-native-paper';
import { setUsername, setLoading, setSessionID } from '../../redux/movieSlicer';
import * as Colors from '../../styles/colors';
import { addSession } from '../../utils/firebase';

export default function CreateSessionScreen({ navigation }) {
  const [localUsername, setLocalUsername] = useState('');
  const [localSessionID, setLocalSessionID] = useState('');
  const [userError, setUserError] = useState(false);
  const [sessionError, setSessionError] = useState(false);

  const dispatch = useDispatch();

  const createSession = () => {
    const validUsername = localUsername !== '';
    const validSession = localSessionID !== '';
    if (!validUsername) {
      if (!validSession) {
        setUserError(true);
        setSessionError(true);
      } else {
        setUserError(true);
        setSessionError(false);
      }
    } else if (!validSession) {
      setSessionError(true);
      setUserError(false);
    } else {
      dispatch(setUsername(localUsername));
      dispatch(setSessionID(localSessionID));
      dispatch(setLoading(true));
      addSession(localUsername, localSessionID);
      navigation.navigate('RatingScreen');
    }
  };

  return (
    <View style={styles.container}>
      <Headline style={styles.heading1}>What's your nickname?</Headline>
      <TextInput
        mode="outlined"
        label="Nickname"
        error={userError}
        onChangeText={(val) => setLocalUsername(val)}
        value={localUsername}
        placeholder="Enter your nickname..."
      />
      <Headline style={styles.heading2}>What's the name of the party?</Headline>
      <TextInput
        mode="outlined"
        label="Name of movie party"
        error={sessionError}
        onChangeText={(val) => setLocalSessionID(val)}
        value={localSessionID}
        placeholder="Enter a name for the party..."
      />
      <Pressable style={styles.button} onPress={() => createSession()}>
        <Text style={styles.buttonText}> Create a session</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: Colors.DARK_PURPLE,
    paddingLeft: 20,
    paddingRight: 20,
  },
  button: {
    backgroundColor: Colors.PURPLE,
    marginTop: 20,
    margin: 10,
    padding: 10,
    maxWidth: 150,
    borderRadius: 10,
  },
  buttonText: {
    color: Colors.WHITE,
    textAlign: 'center',
  },
  heading1: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    textAlign: 'center',
    fontStyle: 'italic',
  },
  heading2: {
    color: Colors.ORANGE_LIGHT,
    fontSize: 24,
    margin: 30,
    marginTop: 40,
    textAlign: 'center',
    fontStyle: 'italic',
  },
});
