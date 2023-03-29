import { View, Text, TextInput, Button, Image } from "react-native";
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
import { server } from "../../../../../Static";

export default function RequestService({ route, navigation }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [imageUrl, setImageURL] = useState("");
  const { service } = useSelector((state) => state.requestServiceSlice);

  const dispatch = useDispatch();
  const mechanicInfo = route.params;
  const mechanicID = mechanicInfo.mechanicID;
  const services = mechanicInfo.services;

  const userInfo = useSelector(data);
  const userID = userInfo && userInfo.AccountData.personalInformation.UUID;

  const image = `${server}/api/Upload/files/${userID}/PROBLEM`;
  if (!isLoaded) {
    setImageURL(image + "?" + new Date());
    setIsLoaded(true);
  }

  return (
    <View>
      <View style={{ backgroundColor: "red", width: "50%", height: "30%" }}>
        <Image
          source={{ uri: imageUrl }}
          style={{ width: "100%", height: "100%" }}
        />
      </View>
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
