import { View, Text, Button } from "react-native";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkRequests } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";

export default function Profile({ navigation }) {
  const profile = useSelector(data);
  const dispatch = useDispatch();

  console.log("Get Prof: " + JSON.stringify(profile, null, 2));
  useEffect(() => {
    dispatch(checkRequests(profile.AccountData.personalInformation.UUID));
  }, [dispatch]);
  return (
    <View>
      <Text>ID: {profile.AccountData.personalInformation.UUID}</Text>
      <Text>
        Name: {profile.AccountData.personalInformation.Firstname}{" "}
        {profile.AccountData.personalInformation.Lastname}
      </Text>
      <Text>Contact: {profile.AccountData.personalInformation.Contact}</Text>
      <Text>
        Birthdate: {profile.AccountData.personalInformation.Birthdate}
      </Text>
      <Text>Address: {profile.AccountData.personalInformation.Address}</Text>
      <Text></Text>
      <Button
        title="Change Password"
        onPress={() => {
          navigation.navigate("ChangePass", {
            uuid: profile.AccountData.personalInformation.UUID,
          });
        }}
      />
      <Button
        title="Edit Profile"
        onPress={() => {
          navigation.navigate("ChangeProf");
        }}
      />
      <Button
        title="Delete Account"
        onPress={() =>
          navigation.navigate("Delete", {
            uuid: profile.AccountData.personalInformation.UUID,
          })
        }
      />
    </View>
  );
}
