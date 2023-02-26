import { View, Text, Button } from "react-native";
import { useEffect, useState } from "react";
import { apiKey } from "../../../../../Static";
import { fetchService } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useDispatch, useSelector } from "react-redux";

export default function MechanicProfile({ route, navigation }) {
  const ShopData = route.params;
  const dispatch = useDispatch();
  const { services } = useSelector((state) => state.mechanicListSlice);

  useEffect(() => {
    dispatch(fetchService(ShopData.ShopData.personalInformation.UUID));
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
      <Button
        title="Request Service"
        onPress={() => navigation.navigate("RequestService")}
      />
    </View>
  );
}
