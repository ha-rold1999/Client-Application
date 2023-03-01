import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { apiKey } from "../../../../../Static";
import { fetchService } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { fetchMechaniLocation } from "../../../../../Redux/MapReducers/MechanicLocationReducer";
import { useDispatch, useSelector } from "react-redux";

export default function MechanicProfile({ route, navigation }) {
  const ShopData = route.params;
  const mechanicID = ShopData.ShopData.personalInformation.UUID;
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.mechanicListSlice);
  const { longitude, latitude } = useSelector(
    (state) => state.mechanicLocationSlice
  );

  useEffect(() => {
    dispatch(fetchService(mechanicID));
    dispatch(fetchMechaniLocation(mechanicID));
  }, [dispatch]);

  return (
    <View>
      <Text>{ShopData.ShopData.accountStatus.Shop.ShopName}</Text>
      <Text>Services: </Text>
      {services.map(({ ServiceName, UUID, Price }) => (
        <View key={UUID}>
          <Text>Service Name: {ServiceName}</Text>
          <Text>Price: {Price}</Text>
        </View>
      ))}
      <Text>Longitude: {longitude}</Text>
      <Text>Latitude: {latitude}</Text>
      <Button
        title="Request Service"
        onPress={() =>
          navigation.navigate("RequestService", {
            mechanicID: mechanicID,
            services: services,
            navigation: navigation,
            longitude: longitude,
            latitude: latitude,
          })
        }
      />
    </View>
  );
}
