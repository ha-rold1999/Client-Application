import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { checkRequests } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { checkInSession } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";

export default function ServiceStatus() {
  const dispatch = useDispatch();
  const profile = useSelector(data);
  const { inSession } = useSelector((state) => state.requestStatusSlice);
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(checkRequests(profile.AccountData.personalInformation.UUID));
      dispatch(checkInSession(profile.AccountData.personalInformation.UUID));
    }, 5000);

    return () => clearInterval(time);
  }, []);
  return <View>{inSession && <Text>The mechanic is on its way</Text>}</View>;
}

const styles = StyleSheet.create({});
