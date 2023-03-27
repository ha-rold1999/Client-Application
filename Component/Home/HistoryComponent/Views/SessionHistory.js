import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { server, apiKey } from "../../../../Static";
import { useSelector } from "react-redux";
import SessionCard from "./SessionCard";

export default function SessionHistory() {
  const [isLoading, setIsLoading] = useState(true);
  const [sessionHistory, setSessionHistory] = useState(null);
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
          setSessionHistory(response);
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
        data={sessionHistory.data}
        renderItem={(item) => <SessionCard data={item} />}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
