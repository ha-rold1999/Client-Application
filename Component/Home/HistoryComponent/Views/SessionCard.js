import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function SessionCard({ data }) {
  return (
    <View
      style={{
        borderWidth: 1,
        margin: 4,
        elevation: 5,
        backgroundColor: "pink",
      }}
    >
      <Text>Session ID: {data.item.SessionID}</Text>
      <Text>Mechanic ID: {data.item.MechanicUUID}</Text>
      <Text>Details: {data.item.SessionDetails}</Text>
      <Text>Time start: {data.item.TimeStart}</Text>
      <Text>Time end: {data.item.TimeEnd}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
