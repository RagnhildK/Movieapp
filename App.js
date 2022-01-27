import React from "react";
import SignUp from "./Screens/Signup/Signup";
import SignIn from "./Screens/SignIn/Signin";
import Rating from "./Screens/Rating";
import store from "./redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { Provider } from "react-redux";
import "react-native-gesture-handler";

const Stack = createStackNavigator();
const Home = () => <Text style={styles.header}>Home screen</Text>;

const App = () => (
  <Provider store={store}>
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Rating}
          options={{ title: "Home" }}
        />
        <Stack.Screen name="Sign in" component={SignIn} />
        <Stack.Screen name="Sign up" component={SignUp} />
      </Stack.Navigator>
    </NavigationContainer>
  </Provider>
);

const styles = StyleSheet.create({
  container: {
    marginTop: 25,
    padding: 10,
  },
  nav: {
    flexDirection: "row",
    justifyContent: "space-around",
  },
});

export default App;
