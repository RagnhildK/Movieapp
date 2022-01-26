import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { Router, Route, Link } from './react-router';
import SignUp from "./Pages/Signup/Signup";
import SignIn from "./Pages/Signin/Signin";
import Rating from './Pages/Rating/Rating';

const App = () => (
  <Router>
    <View style={styles.container}>
      <View style={styles.nav}>
        <Link to="/">
          <Text>Sign in</Text>
        </Link>
        <Link to="/signup">
          <Text>Sign up</Text>
        </Link>
        <Link to="/rating"> 
          <Text> Rating </Text>
        </Link>
      </View>
      <Route exact path="/" component={SignIn} />
      <Route path="/signup" component={SignUp} />
      <Route path="/signin" component={SignIn} />
      <Route path="/rating" component={Rating} />

    </View>
  </Router>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10
  },
  nav:{
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
});

export default App;
