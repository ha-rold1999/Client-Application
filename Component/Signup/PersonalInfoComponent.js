import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import { useState } from "react";
import DatePicker from "../FormCoponent/DatePickerComponent";

export default function PersonalInformation() {
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [dateOfBirth, setDateOfBirth] = useState();

  return (
    <>
      <Text style={FormStyle.label}>Firstname</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/person.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
      <Text style={FormStyle.label}>Lastname</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/person.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
      <Text style={FormStyle.label}>Contact</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/phone.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput style={FormStyle.input} keyboardType="numeric" />
      </View>
      {/*===================================================*/}
      <Text style={FormStyle.label}>Birthdate</Text>
      <DatePicker />

      {/*===================================================*/}
      <Text style={FormStyle.label}>Address</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/location.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
    </>
  );
}
