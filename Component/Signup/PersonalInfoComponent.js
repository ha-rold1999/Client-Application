import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import { useState } from "react";
import DatePicker from "../FormCoponent/DatePickerComponent";

export default function PersonalInformation(props) {
  return (
    <>
      {/*Firstname Input*/}
      <Text style={FormStyle.label}>Firstname</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/person.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setFirstname}
          value={props.firstname}
          autoComplete="name-given"
        />
      </View>
      {props.firstnameError && (
        <Text style={{ color: "red" }}>{props.firstnameError}</Text>
      )}

      {/*Lastname Input*/}
      <Text style={FormStyle.label}>Lastname</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/person.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setLastName}
          value={props.lastname}
        />
      </View>
      {props.lastnameError && (
        <Text style={{ color: "red" }}>{props.lastnameError}</Text>
      )}

      {/*Contact Input*/}
      <Text style={FormStyle.label}>Contact</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/phone.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput
          style={FormStyle.input}
          keyboardType="numeric"
          onChangeText={props.setContact}
          value={props.contact}
        />
      </View>
      {props.contactError && (
        <Text style={{ color: "red" }}>{props.contactError}</Text>
      )}

      {/*Birthdate Input*/}
      <Text style={FormStyle.label}>Birthdate</Text>
      <DatePicker
        birthdate={props.birthdate}
        setBirthdate={props.setBirthdate}
      />
      {props.birthdateError && (
        <Text style={{ color: "red" }}>{props.birthdateError}</Text>
      )}

      {/*Address Input*/}
      <Text style={FormStyle.label}>Address</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/location.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setAddress}
          value={props.address}
        />
      </View>
      {props.addressError && (
        <Text style={{ color: "red" }}>{props.addressError}</Text>
      )}
    </>
  );
}
