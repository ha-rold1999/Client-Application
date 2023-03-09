import { Button, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import DatePicker from "../../../../FormCoponent/DatePickerComponent";
import { useDispatch } from "react-redux";
import {
  changeInfo,
  getAllData,
} from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { server, apiKey } from "../../../../../Static";

export default function ChangeProfile({ navigation }) {
  const dispatch = useDispatch();

  const profile = useSelector(data);
  const UUID = profile.AccountData.personalInformation.UUID;
  const [Firstname, setFname] = useState(
    profile.AccountData.personalInformation.Firstname
  );
  const [Lastname, setLName] = useState(
    profile.AccountData.personalInformation.Lastname
  );
  const [Contact, setContact] = useState(
    profile.AccountData.personalInformation.Contact
  );
  const Birthdate = profile.AccountData.personalInformation.Birthdate;
  const [Address, setAddress] = useState(
    profile.AccountData.personalInformation.Address
  );
  const License = profile.AccountData.personalInformation.LicenseNumber;
  const [Expiry, setExpiry] = useState(
    profile.AccountData.personalInformation.Expiry
  );
  return (
    <View>
      <Text>Change Profile</Text>
      <Text>Firstname</Text>
      <TextInput value={Firstname} onChangeText={setFname} />
      <Text>Lastname</Text>
      <TextInput value={Lastname} onChangeText={setLName} />
      <Text>Contact</Text>
      <TextInput value={Contact} onChangeText={setContact} />
      <Text>Address</Text>
      <TextInput value={Address} onChangeText={setAddress} />
      <Text>License Expiration Date</Text>
      <DatePicker birthdate={Expiry} setBirthdate={setExpiry} />
      <Button
        title="Save Changes"
        onPress={() => {
          dispatch(
            changeInfo(
              UUID,
              Firstname,
              Lastname,
              Contact,
              Birthdate,
              Address,
              License,
              Expiry
            )
          );

          setTimeout(() => {
            fetch(`${server}/api/Account`, {
              method: "GET",
              headers: {
                "Content-Type": "application/json",
                "AYUS-API-KEY": apiKey,
                uuid: UUID,
              },
            })
              .then((res) => res.json())
              .then((data) => dispatch(getAllData(data)))
              .then(() => navigation.navigate("Profile"))
              .catch((error) => console.log(error));
          }, 500);
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
