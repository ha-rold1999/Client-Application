import { View, Text } from "react-native";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector } from "react-redux";

export default function Profile() {
  const profile = useSelector(data);
  return (
    <View>
      <Text>{profile.AccountData.personalInformation.Firstname}</Text>
    </View>
  );
}
