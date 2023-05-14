import LaodingScreen from "./Component/LoadingComponent";
import InitialScreen from "./Component/InitialComponent";
import SingupScreen from "./Component/SignupComponent";
import LoginScreen from "./Component/LoginComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";
import { Provider } from "react-redux";
import store from "./Redux/Store";
import HomeScreen from "./Component/HomeComponent";
import "react-native-gesture-handler";

import { LogBox } from "react-native";
LogBox.ignoreLogs(["new NativeEventEmitter"]);
LogBox.ignoreAllLogs();

export default function App() {
  /*
   *Todo:
   *    Continue migrating all signup forms in redux
   *    Validation for each form
   *    Try to export all the props in the slice with a single export name
   *    Try a cleaner approach in validating the form
   */

  const Stack = createNativeStackNavigator();
  let [isLoading, loading] = useState(true);

  setTimeout(() => {
    loading(false);
  }, 100); //Change this if needed

  if (isLoading) {
    return <LaodingScreen />;
  }
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="InitialScreen"
            component={InitialScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen name="Signup" component={SingupScreen} />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
