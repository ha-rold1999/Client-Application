import LaodingScreen from "./Component/LoadingComponent";
import InitialScreen from "./Component/InitialComponent";
import SingupScreen from "./Component/SignupComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { useState } from "react";

export default function App() {
  const Stack = createNativeStackNavigator();
  let [isLoading, loading] = useState(true);

  setTimeout(() => {
    loading(false);
  }, 3000);

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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
