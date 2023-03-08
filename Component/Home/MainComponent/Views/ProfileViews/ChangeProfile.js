import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import DatePicker from "../../../../FormCoponent/DatePickerComponent";

export default function ChangeProfile() {
  const profile = useSelector(data);
  return (
    <View>
      <Text>Change Profile</Text>
      <Text>Firstname</Text>
      <TextInput value={profile.AccountData.personalInformation.Firstname} />
      <Text>Lastname</Text>
      <TextInput value={profile.AccountData.personalInformation.Lastname} />
      <Text>Contact</Text>
      <TextInput value={profile.AccountData.personalInformation.Contact} />
      <Text>Address</Text>
      <TextInput value={profile.AccountData.personalInformation.Address} />
      <Text>License Expiration Date</Text>
      <DatePicker birthdate={profile.AccountData.personalInformation.Expiry} />
      <Button title="Save Changes" />
    </View>
  );
}

const styles = StyleSheet.create({});
