import { StyleSheet, Text, View, ActivityIndicator } from "react-native";
import React from "react";

export default function Loading() {
  return (
    <View
      style={{
        backgroundColor: "#E8F1F8",
        width: "70%",
        height: "10%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
        elevation: 10,
      }}
    >
      <Text style={{ fontSize: 20, fontWeight: "500" }}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
