import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ToastAndroid,
} from "react-native";
import React from "react";
import * as Clipboard from "expo-clipboard";
import { LinearGradient } from "expo-linear-gradient";

export default function TransactionCard({ data }) {
  return (
    <LinearGradient
      colors={["#cff5fb", "#fcfdfd"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View
        style={{
          borderWidth: 1,
          margin: 4,
          elevation: 5,
          backgroundColor: "white",
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 10,
        }}
      >
        <TouchableOpacity
          onPress={() => {
            Clipboard.setStringAsync(data.item.TransactionID);
            ToastAndroid.show("Text Copied", ToastAndroid.SHORT);
          }}
          style={{ flexDirection: "row", alignItems: "center" }}
        >
          <Text style={{ fontSize: 12 }}>
            Transaction ID: {data.item.TransactionID}
          </Text>
          <View style={{ alignItems: "flex-end" }}>
            <Image
              source={require("../../../../assets/Icons/copy.png")}
              style={{ width: 15, height: 15 }}
            />
          </View>
        </TouchableOpacity>
        <Text>Date of Transaction: {data.item.TimeEnd}</Text>
        <Text>
          Service Price:{" "}
          {data.item.SessionDetails.split("|")[0].split(": ")[1].split(":")[0]}
        </Text>
        <Text>
          Service Name:{" "}
          {data.item.SessionDetails.split("|")[0].split(": ")[1].split(":")[1]}
        </Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
