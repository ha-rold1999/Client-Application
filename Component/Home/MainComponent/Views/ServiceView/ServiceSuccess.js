import { StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  postTransaction,
  endSession,
} from "../../../../../Redux/MechanicReducers/RequestStatusReducers";

export default function ServiceSuccess({ route }) {
  const dispatch = useDispatch();
  const { transactionID } = useSelector((state) => state.requestStatusSlice);
  const SessionID = route.params;
  const UUID = SessionID.SessionID;
  const ServiceName = SessionID.ServiceName;
  const Fee = SessionID.Fee;
  console.log("sessiongID: " + UUID);
  console.log("transactionID: " + transactionID);
  console.log("ServiceName: " + ServiceName);
  console.log("Fee: " + Fee);

  useEffect(() => {
    if (transactionID === null) {
      dispatch(postTransaction(ServiceName, Fee));
      console("transacting");
    } else {
      console.log("end");
      dispatch(endSession(UUID, transactionID));
    }
  }, [dispatch]);
  return (
    <View>
      <Text>ServiceSuccess</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
