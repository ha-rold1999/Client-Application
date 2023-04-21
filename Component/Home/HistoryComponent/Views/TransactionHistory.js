import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TransactionCard from "./TransactionCard";
import { server, apiKey } from "../../../../Static";

export default function TransactionHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [transactionHistory, setTransactionHistory] = useState(null);
  const { data } = useSelector((state) => state.informationSlice);
  const UUID = data.AccountData.personalInformation.UUID;
  useEffect(() => {
    const time = setInterval(async () => {
      await fetch(`${server}/api/history`, {
        method: "GET",
        headers: {
          "AYUS-API-KEY": apiKey,
          UserID: UUID,
          option: "session",
          limit: 10,
        },
      })
        .then((res) => res.json())
        .then((response) => {
          setTransactionHistory(response);
          setIsLoading(false);
        });
    }, 10000);
    return () => clearInterval(time);
  }, []);

  if (isLoading) {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
  return (
    <View style={{ flex: 1 }}>
      <FlatList
        data={transactionHistory.data}
        renderItem={(item) => <TransactionCard data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
