import LaodingScreen from "./Component/LoadingComponent";
import InitialScreen from "./Component/InitialComponent";
import SingupScreen from "./Component/SignupComponent";
import LoginScreen from "./Component/LoginComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  let [isLoading, loading] = useState(true);

  setTimeout(() => {
    loading(false);
  }, 100); //Change this if needed

  if (isLoading) {
    return <LaodingScreen />;
  }
  return (
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
