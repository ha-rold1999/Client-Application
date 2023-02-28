import { View, Text, TextInput, Button } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector, useDispatch } from "react-redux";
import { useState } from "react";
import {
  handleLocation,
  handleContact,
  handleVehicle,
  handleDescription,
  handleService,
  postRequest,
} from "../../../../../Redux/RequestReducers/RequestReducer";

export default function RequestService({ route }) {
  const { service } = useSelector((state) => state.requestServiceSlice);

  const dispatch = useDispatch();
  const mechanicInfo = route.params;
  const mechanicID = mechanicInfo.mechanicID;
  const mechaniService = mechanicInfo.services;

  const userInfo = useSelector(data);
  const userID = userInfo.AccountData.personalInformation.UUID;

  return (
    <View>
      <Text>{userID}</Text>
      <Text>{mechanicID}</Text>
      <Text>Service</Text>
      <Picker
        selectedValue={service}
        onValueChange={(itemValue) => dispatch(handleService(itemValue))}
      >
        {mechaniService.map(({ ServiceName, ServiceID }) => (
          <Picker.Item
            label={ServiceName}
            value={ServiceName}
            key={ServiceID}
          />
        ))}
      </Picker>
      <Text>Location</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={(text) => dispatch(handleLocation(text))}
      />
      <Text>Contact</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={(text) => dispatch(handleContact(text))}
      />
      <Text>Vehicle</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={(text) => dispatch(handleVehicle(text))}
      />
      <Text>Description</Text>
      <TextInput
        style={{ borderWidth: 1 }}
        onChangeText={(text) => dispatch(handleDescription(text))}
      />
      <Button
        title="Submit Request"
        onPress={() =>
          dispatch(postRequest({ userID: userID, mechanicID: mechanicID }))
        }
      />
    </View>
  );
}
