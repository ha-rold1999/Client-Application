import {
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  FlatList,
  Image,
} from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import TransactionCard from "./TransactionCard";
import { server, apiKey } from "../../../../Static";
import Loading from "../../MainComponent/Loading";

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
    }, 5000);
    return () => clearInterval(time);
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }
  if (transactionHistory.data.length) {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={transactionHistory.data}
          renderItem={(item) => <TransactionCard data={item} />}
        />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Image
          source={require("../../../../assets/Icons/empty.png")}
          style={{ width: 200, height: 200 }}
        />
        <Text>No transaction as of the moment</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
