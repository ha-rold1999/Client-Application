import { StyleSheet, Text, View, Image } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postTransaction,
  endSession,
} from "../../../../../Redux/MechanicReducers/RequestStatusReducers";
import { useState } from "react";
import Loading from "../../Loading";

export default function ServiceSuccess({ route }) {
  const dispatch = useDispatch();
  const { transactionID } = useSelector((state) => state.requestStatusSlice);
  const [isLoading, setIsLoading] = useState(true);
  const SessionID = route.params;
  const UUID = SessionID.SessionID;
  const ServiceName = SessionID.ServiceName;
  const Fee = SessionID.Fee;
  useEffect(() => {
    setTimeout(() => {
      if (transactionID === null) {
        dispatch(postTransaction(ServiceName, Fee));
        return;
      }

      dispatch(endSession(UUID, transactionID));
      setIsLoading(false);
    }, 5000);
  }, [transactionID]);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
  }

  if (transactionID === null) {
    return (
      <View>
        <Text>ServiceSuccess</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../../../assets/Icons/done.png")}
          style={{ width: 300, height: 300, marginBottom: 10 }}
        />
        <Text style={{ fontSize: 30, fontWeight: "700" }}>Session Ended</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
