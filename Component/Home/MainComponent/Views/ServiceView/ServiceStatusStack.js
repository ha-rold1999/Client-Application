import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import ServiceStatus from "./ServiceStatus";
import ServiceSuccess from "./ServiceSuccess";
import ServicePaymet from "./ServicePaymet";

export default function ServiceStatusStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ServiceStatus"
    >
      <Stack.Screen name="ServiceStatus" component={ServiceStatus} />
      <Stack.Screen name="ServiceSucces" component={ServiceSuccess} />
      <Stack.Screen name="ServicePayment" component={ServicePaymet} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
