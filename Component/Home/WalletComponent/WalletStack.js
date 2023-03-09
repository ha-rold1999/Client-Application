import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wallet from "./Wallet";
import WalletPin from "./WalletPin";

export default function WalletStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="WalletPin"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WalletPin" component={WalletPin} />
      <Stack.Screen name="Wallet" component={Wallet} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
