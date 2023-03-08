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
import { setTabEnable } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";

export default function RequestService({ route, navigation }) {
  const { service } = useSelector((state) => state.requestServiceSlice);

  const dispatch = useDispatch();
  const mechanicInfo = route.params;
  const mechanicID = mechanicInfo.mechanicID;

  const userInfo = useSelector(data);
  const { services } = useSelector((state) => state.mechanicListSlice);
  const userID = userInfo && userInfo.AccountData.personalInformation.UUID;

  return (
    <View>
      <Text>{userID}</Text>
      <Text>{mechanicID}</Text>
      <Text>Service</Text>
      <Picker
        selectedValue={service}
        onValueChange={(itemValue) => dispatch(handleService(itemValue))}
      >
        {services.map(({ ServiceName, ServiceID, Price }) => (
          <Picker.Item
            label={ServiceName}
            value={ServiceName + ":" + Price}
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
        onPress={() => {
          dispatch(postRequest({ userID: userID, mechanicID: mechanicID }));
          dispatch(setTabEnable(false));
          navigation.reset({
            index: 0,
            routes: [{ name: "ServiceStatusStack" }],
          });
        }}
      />
    </View>
  );
}
