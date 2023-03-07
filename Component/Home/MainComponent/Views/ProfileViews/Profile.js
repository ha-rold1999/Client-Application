import { View, Text, Button } from "react-native";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect } from "react";
import { checkRequests } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";

export default function Profile({ navigation }) {
  const profile = useSelector(data);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(checkRequests(profile.AccountData.personalInformation.UUID));
  }, [dispatch]);
  return (
    <View>
      <Text>Name: {profile.AccountData.personalInformation.Firstname}</Text>
      <Text>ID: {profile.AccountData.personalInformation.UUID}</Text>
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
