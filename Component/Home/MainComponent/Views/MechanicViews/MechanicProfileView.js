import { View, Text, Button, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { fetchService } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { fetchMechaniLocation } from "../../../../../Redux/MapReducers/MechanicLocationReducer";
import { useDispatch, useSelector } from "react-redux";
import MechanicLocation from "./MechanicLocation";

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

  if (
    services !== undefined &&
    longitude !== undefined &&
    latitude !== undefined
  ) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <View style={{ flex: 1 }}>
            <MechanicLocation longitude={longitude} latitude={latitude} />
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text>{ShopData.ShopData.accountStatus.Shop.ShopName}</Text>
          <Text>Services: </Text>
          {services.map(({ ServiceName, UUID, Price }) => (
            <View key={UUID}>
              <Text>Service Name: {ServiceName}</Text>
              <Text>Price: {Price}</Text>
            </View>
          ))}
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
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}
