import { StyleSheet, Text, View } from "react-native";
import React from "react";

export default function TransactionCard({ data }) {
  return (
    <View
      style={{
        borderWidth: 1,
        margin: 4,
        elevation: 5,
        backgroundColor: "pink",
      }}
    >
      <Text>Transaction ID: {data.item.ID}</Text>
      <Text>Date of Transaction: {data.item.DateOfTransaction}</Text>
      <Text>Service Price: {data.item.ServicePrice}</Text>
      <Text>Service Name: {data.item.ServiceName}</Text>
      <Text>Remark: {data.item.Remark}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
