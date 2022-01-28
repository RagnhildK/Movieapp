import React from "react";
import SignUp from "./Screens/Signup/Signup";
import SignIn from "./Screens/SignIn/Signin";
import Rating from "./Screens/Rating";
import Result from "./Screens/Results";
import store from "./redux/store";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider as StoreProvider } from "react-redux";
import "react-native-gesture-handler";

const Stack = createStackNavigator();
const Home = () => <Text style={styles.header}>Home screen</Text>;

const App = () => (
  <StoreProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: "#99ccff",
          },
          headerTintColor: "#fff",
          headerTitleAlign: 'center',
        }}
      >
        <Stack.Screen
          name="Home"
          component={Rating}
          options={{
            title: "Home",
          }}
        />
        <Stack.Screen name="Sign in" component={SignIn} />
        <Stack.Screen name="Sign up" component={SignUp} />
        <Stack.Screen name="Result" component={Result} />
      </Stack.Navigator>
    </NavigationContainer>
  </StoreProvider>
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
