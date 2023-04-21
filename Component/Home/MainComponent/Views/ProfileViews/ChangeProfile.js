import {
  Button,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
  TouchableOpacity,
} from "react-native";
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
import FormStyle from "../../../../../Style/Component/StyleSignupComponent";
import Pressable from "react-native/Libraries/Components/Pressable/Pressable";
import Icon from "react-native-vector-icons/FontAwesome";

export default function ChangeProfile({ navigation }) {
  const dispatch = useDispatch();

  const profile = useSelector(data);
  const UUID = profile.AccountData.personalInformation.UUID;
  const [Firstname, setFname] = useState(
    profile.AccountData.personalInformation.Firstname
  );
  const [FirstnameError, setFnameError] = useState();
  const [Lastname, setLName] = useState(
    profile.AccountData.personalInformation.Lastname
  );
  const [LastnameError, setLNameError] = useState();
  const [Contact, setContact] = useState(
    profile.AccountData.personalInformation.Contact
  );
  const [ContactError, setContactError] = useState();
  const Birthdate = profile.AccountData.personalInformation.Birthdate;
  const [Address, setAddress] = useState(
    profile.AccountData.personalInformation.Address
  );
  const [AddressError, setAddressError] = useState();
  const License = profile.AccountData.personalInformation.LicenseNumber;
  const [Expiry, setExpiry] = useState(
    profile.AccountData.personalInformation.Expiry
  );
  return (
    <View style={{ flex: 1 }}>
      {/* Change Password and Header */}
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          paddingHorizontal: 10,
          paddingBottom: 20,
        }}
      >
        <Text style={{ fontSize: 20, fontWeight: "bold" }}>Edit Profile</Text>
        <Pressable
          onPress={() => {
            navigation.navigate("ChangePass", {
              uuid: UUID,
            });
          }}
        >
          <Text style={{ color: "#228BD4" }}>Change Password</Text>
        </Pressable>
      </View>

      {/* Form */}
      <View style={{ width: "100%", paddingHorizontal: 10 }}>
        <Text style={styles.label}>Firstname</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/person.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setFname(text)}
            value={Firstname}
          />
        </View>
        {FirstnameError && (
          <Text style={{ color: "red" }}>{FirstnameError}</Text>
        )}
        <Text style={styles.label}>Lastname</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/person.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setLName(text)}
            value={Lastname}
          />
        </View>
        {LastnameError && <Text style={{ color: "red" }}>{LastnameError}</Text>}
        <Text style={styles.label}>Contact</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/phone.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setContact(text)}
            value={Contact}
          />
        </View>
        {ContactError && <Text style={{ color: "red" }}>{ContactError}</Text>}
        <Text style={styles.label}>Address</Text>
        <View style={FormStyle.textInputView}>
          <Image
            source={require("../../../../../assets/Icons/location.png")}
            style={{ width: 30, height: 30, marginRight: 5 }}
          />
          <TextInput
            style={FormStyle.input}
            onChangeText={(text) => setAddress(text)}
            value={Address}
          />
        </View>
        {AddressError && <Text style={{ color: "red" }}>{AddressError}</Text>}
        <Text style={styles.label}>License Expiration Date</Text>
        <DatePicker birthdate={Expiry} setBirthdate={setExpiry} />
      </View>

      {/* Delete Button */}
      <View style={{ flex: 1 }}>
        <View style={{ width: 40 }}>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Delete", {
                uuid: UUID,
              })
            }
            style={{ paddingTop: 20, paddingLeft: 10 }}
          >
            <Icon name="trash" size={20} style={{ color: "grey" }} />
          </TouchableOpacity>
        </View>
      </View>

      {/* Save Button */}
      <View
        style={{
          width: "100%",
          height: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Pressable
          style={{
            backgroundColor: "#228BD4",
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 5,
          }}
          onPress={() => {
            //firstname validation
            if (!Firstname) {
              setFnameError("Enter your firstname");
              console.log(FirstnameError);
            } else if (
              !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(Firstname)
            ) {
              setFnameError("Enter a valid firstname");
            } else {
              setFnameError("");
            }
            //lastname validation
            if (!Lastname) {
              setLNameError("Enter your lastname");
            } else if (
              !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(Lastname)
            ) {
              setLNameError("Enter a valid lastname");
            } else {
              setLNameError("");
            }
            //contact validation
            if (!Contact) {
              setContactError("Enter your number");
              console.log(ContactError);
            } else if (!/^(09|\+639)\d{9}$/.test(Contact)) {
              setContactError("Enter a valid contact number");
            } else {
              setContactError("");
            }
            //address validation
            if (!Address) {
              setAddressError("Enter your address");
            } else if (!/^([a-zA-z0-9/\\''(),-\s]{2,255})$/.test(Address)) {
              setAddressError("Enter a valid address");
            } else {
              setAddressError("");
            }

            if (
              FirstnameError === "" &&
              LastnameError === "" &&
              ContactError === "" &&
              AddressError === ""
            ) {
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
                  .then((data) => {
                    dispatch(getAllData(data));
                    ToastAndroid.show("Profile Updated", ToastAndroid.SHORT);
                  })
                  .then(() =>
                    navigation.reset({
                      index: 0,
                      routes: [{ name: "ProfileView" }],
                    })
                  )
                  .catch((error) => console.log(error));
              }, 500);
            } else {
              {
                /* Do Nothing */
              }
            }
          }}
        >
          <Text style={{ fontSize: 15 }}>Save Changes</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  label: {
    paddingTop: 10,
  },
});
