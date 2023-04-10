import { StyleSheet, Text, View, Image } from "react-native";
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
      <Tab.Screen
        name="Session History"
        component={SessionHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/session.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Transaction History"
        component={TransactionHistory}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/transaction.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}

const styles = StyleSheet.create({});
