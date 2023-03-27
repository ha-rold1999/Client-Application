import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import SessionHistory from "./Views/SessionHistory";
import TransactionHistory from "./Views/TransactionHistory";

export default function HistoryTabs() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Session History"
    >
      <Tab.Screen name="Session History" component={SessionHistory} />
      <Tab.Screen name="Transaction History" component={TransactionHistory} />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
