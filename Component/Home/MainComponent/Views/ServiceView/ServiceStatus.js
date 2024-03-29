import { Button, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import { checkRequests } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { checkInSession } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";
import SessionMap from "./SessionMap";

export default function ServiceStatus({ navigation }) {
  const dispatch = useDispatch();
  const profile = useSelector(data);
  const { inSession, sessionID } = useSelector(
    (state) => state.requestStatusSlice
  );
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(checkRequests(profile.AccountData.personalInformation.UUID));
      dispatch(checkInSession(profile.AccountData.personalInformation.UUID));
    }, 5000);

    return () => clearInterval(time);
  }, []);

  if (inSession && sessionID !== null) {
    return (
      <View>
        <SessionMap sessionID={sessionID} navigation={navigation} />
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "white",
        }}
      >
        <Image
          source={require("../../../../../assets/Icons/noService.png")}
          style={{ width: 300, height: 300 }}
        />
        <Text style={{ fontSize: 30, textAlign: "center", fontWeight: "600" }}>
          No Service as of the moment
        </Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({});
