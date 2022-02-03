import React from "react";
import store from "./redux/store";
import RatingScreen from "./Screens/RatingScreen/RatingScreen";
import ResultScreen from "./Screens/ResultScreen/ResultsScreen";
import JoinSessionScreen from "./Screens/JoinSessionScreen/JoinSessionScreen";
import CreateOrJoinScreen from "./Screens/CreateOrJoinScreen/CreateOrJoinScreen";
import CreateSessionScreen from "./Screens/CreateSessionScreen/CreateSessionScreen";
import { Provider as StoreProvider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";

import "react-native-gesture-handler";

import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Setting a timer']);

const Stack = createStackNavigator();
const App = () => (
  <StoreProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen
          name="CreateOrJoinScreen"
          component={CreateOrJoinScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="CreateSessionScreen"
          component={CreateSessionScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="JoinSessionScreen"
          component={JoinSessionScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{
            title: "",
          }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{
            title: "",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </StoreProvider>
);

export default App;
