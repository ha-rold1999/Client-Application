import { View, Text, FlatList, ActivityIndicator } from "react-native";
import MechanicCard from "./MechanicCardComponent";
import MainView from "../../../../../Style/Component/MainViewStyles/StyleMainComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  availableMechanics,
  isLoading,
} from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { fetchAsyncData } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useDispatch } from "react-redux";

export default function MechanicList({ navigation }) {
  const dispatch = useDispatch();
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchAsyncData());
    }, 10000);
    return () => clearInterval(time);
  }, [dispatch]);

  const DATA = useSelector(availableMechanics);
  const Loading = useSelector(isLoading);
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      {Loading && <ActivityIndicator />}
      <FlatList
        data={DATA}
        renderItem={({ item }) => (
          <MechanicCard item={item} navigation={navigation} />
        )}
        style={MainView.flatView}
      />
    </View>
  );
}
