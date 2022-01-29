import React from "react";
import store from "./redux/store";
import RatingScreen from "./Screens/RatingScreen";
import CreateOrJoinScreen from "./Screens/CreateOrJoinScreen";
import ResultScreen from "./Screens/CreatorScreens/ResultsScreen";
import WaitingScreen from "./Screens/CreatorScreens/WaitingScreen";
import FinishedScreen from "./Screens/ParticipantScreens/FinishedScreen";
import CreateSessionScreen from "./Screens/CreatorScreens/CreateSessionScreen";
import JoinSessionScreen from "./Screens/ParticipantScreens/JoinSessionScreen";
import { Provider as StoreProvider } from "react-redux";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { StyleSheet, Text } from "react-native";
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
          headerTitleAlign: "center",
        }}
      >
        <Stack.Screen
          name="CreateOrJoinScreen"
          component={CreateOrJoinScreen}
          options={{
            title: "Start page",
          }}
        />
        <Stack.Screen
          name="CreateSessionScreen"
          component={CreateSessionScreen}
          options={{
            title: "Create session",
          }}
        />
        <Stack.Screen name="JoinSessionScreen" component={JoinSessionScreen} options={{
            title: "Join session",
          }} />
        <Stack.Screen name="RatingScreen" component={RatingScreen} options={{
            title: "Rate movies",
          }}/>
        <Stack.Screen name="FinishedScreen" component={FinishedScreen} options={{
            title: "Rating completed",
          }}/>
        <Stack.Screen name="WaitingScreen" component={WaitingScreen} options={{
            title: "",
          }}/>
        <Stack.Screen name="ResultScreen" component={ResultScreen} options={{
            title: "Results",
          }}/>
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
