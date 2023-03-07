import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";

export default function LogoutView({ navigation }) {
  return (
    <View>
      <Text>Do you want to logout</Text>
      <Button
        title="Yes"
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
