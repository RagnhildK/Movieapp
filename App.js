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
import * as Colors from "./styles/colors";

import "react-native-gesture-handler";

const Stack = createStackNavigator();
const App = () => (
  <StoreProvider store={store}>
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle: {
            backgroundColor: Colors.DARK_PURPLE,
          },
          headerTintColor: Colors.WHITE,
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="CreateOrJoinScreen"
          component={CreateOrJoinScreen}
          //component={RatingScreen}
          options={{
            title: "Movie Picker",
          }}
        />
        <Stack.Screen
          name="CreateSessionScreen"
          component={CreateSessionScreen}
          options={{
            title: "Create session",
          }}
        />
        <Stack.Screen
          name="JoinSessionScreen"
          component={JoinSessionScreen}
          options={{
            title: "Join session",
          }}
        />
        <Stack.Screen
          name="RatingScreen"
          component={RatingScreen}
          options={{
            title: "Rate movies",
          }}
        />
        <Stack.Screen
          name="ResultScreen"
          component={ResultScreen}
          options={{
            title: "Results",
          }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  </StoreProvider>
);

export default App;
