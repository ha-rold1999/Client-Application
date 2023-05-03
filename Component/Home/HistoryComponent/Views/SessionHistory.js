import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  Text,
  View,
  Image,
} from "react-native";
import React, { useEffect, useState } from "react";
import { server, apiKey } from "../../../../Static";
import { useSelector } from "react-redux";
import SessionCard from "./SessionCard";
import Loading from "../../MainComponent/Loading";

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

  if (sessionHistory.data.length) {
    return (
      <View style={{ flex: 1 }}>
        <FlatList
          data={sessionHistory.data}
          renderItem={(item) => <SessionCard data={item} />}
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
        <Text>No session history as of the moment</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
