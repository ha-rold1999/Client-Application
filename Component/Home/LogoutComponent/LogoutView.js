import { Button, StyleSheet, Text, View, Pressable, Image } from "react-native";
import React from "react";

export default function LogoutView({ navigation }) {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Image
        source={require("../../../assets/Icons/logout.png")}
        style={{ width: 200, height: 200 }}
      />
      <Text style={{ fontSize: 20, fontWeight: "700" }}>
        Do you want to logout
      </Text>
      <Pressable
        style={{
          backgroundColor: "#02599B",
          paddingHorizontal: 100,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => {
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
          Yes
        </Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({});
