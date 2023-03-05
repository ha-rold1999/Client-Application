import { View, Text, FlatList, ActivityIndicator } from "react-native";
import MechanicCard from "./MechanicCardComponent";
import MainView from "../../../../../Style/Component/MainViewStyles/StyleMainComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  availableMechanics,
  isLoading,
} from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import {
  fetchAsyncData,
  checkRequests,
} from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useDispatch } from "react-redux";
import { enable } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";

export default function MechanicList({ navigation }) {
  const isEnabled = useSelector(enable);
  const userData = useSelector(data);
  const userID = userData.AccountData.personalInformation.UUID;

  const dispatch = useDispatch();
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchAsyncData());
      dispatch(checkRequests(userID));
    }, 10000);
    return () => clearInterval(time);
  }, [dispatch]);

  const DATA = useSelector(availableMechanics);
  const Loading = useSelector(isLoading);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {Loading && <ActivityIndicator />}
      {isEnabled && (
        <FlatList
          data={DATA}
          renderItem={({ item }) => (
            <MechanicCard item={item} navigation={navigation} />
          )}
          style={MainView.flatView}
        />
      )}
      {!isEnabled && (
        <View>
          <Text>You already requested a service</Text>
        </View>
      )}
    </View>
  );
}
