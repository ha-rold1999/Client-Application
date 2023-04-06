import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Profile from "./Profile";
import DeleteAccout from "./DeleteAccout";
import ChangePassword from "./ChangePassword";
import ChangeProfile from "./ChangeProfile";

export default function ProfileStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="ProfileView" component={Profile} />
      <Stack.Screen name="Delete" component={DeleteAccout} />
      <Stack.Screen name="ChangePass" component={ChangePassword} />
      <Stack.Screen name="ChangeProf" component={ChangeProfile} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
