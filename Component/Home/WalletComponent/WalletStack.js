import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Wallet from "./Wallet";
import WalletPin from "./WalletPin";

export default function WalletStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName="WalletView"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="WalletView" component={Wallet} />
    </Stack.Navigator>
  );
}

const styles = StyleSheet.create({});
