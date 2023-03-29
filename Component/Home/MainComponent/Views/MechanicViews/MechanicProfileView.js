import { View, Text, Button, ActivityIndicator } from "react-native";
import { useEffect, useState } from "react";
import { fetchService } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { fetchMechaniLocation } from "../../../../../Redux/MapReducers/MechanicLocationReducer";
import { useDispatch, useSelector } from "react-redux";
import MechanicLocation from "./MechanicLocation";
import { AirbnbRating } from "react-native-ratings";
import { getReview } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";

export default function MechanicProfile({ route, navigation }) {
  const ShopData = route.params;
  const mechanicID = ShopData.ShopData.information.personalInformation.UUID;
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.requestStatusSlice);
  const longitude = ShopData.ShopData.loc.Data.Longitude;
  const latitude = ShopData.ShopData.loc.Data.Latitude;
  const services = ShopData.ShopData.service.Info;

  useEffect(() => {
    dispatch(getReview(mechanicID, "Mechanic"));
  }, [dispatch]);

  if (
    services !== undefined &&
    longitude !== undefined &&
    latitude !== undefined &&
    rating !== null
  ) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.5 }}>
          <View style={{ flex: 1 }}>
            <MechanicLocation longitude={longitude} latitude={latitude} />
          </View>
        </View>
        <View style={{ flex: 0.5 }}>
          <Text>
            {ShopData.ShopData.information.accountStatus.Shop.ShopName}
          </Text>
          <Text>
            <AirbnbRating defaultRating={rating.Rating} isDisabled />
          </Text>
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
                longitude: longitude,
                latitude: latitude,
                services: services,
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
