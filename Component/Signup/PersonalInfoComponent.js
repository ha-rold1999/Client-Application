import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import DatePicker from "../FormCoponent/DatePickerComponent";
import { useSelector, useDispatch } from "react-redux";
import * as PersonalInfo from "../../Redux/SignupFormReducers/PersonalInfoSlice";

export default function PersonalInformation(props) {
  const fname = useSelector(PersonalInfo.firstname);
  const lname = useSelector(PersonalInfo.lastname);
  const contct = useSelector(PersonalInfo.contact);
  const birthDte = useSelector(PersonalInfo.birthdate);
  const addrrs = useSelector(PersonalInfo.address);

  const fNameError = useSelector(PersonalInfo.error);
  const lNameError = useSelector(PersonalInfo.lastnameError);
  const cotactError = useSelector(PersonalInfo.contactError);
  const birthdateError = useSelector(PersonalInfo.birthdateError);
  const addressError = useSelector(PersonalInfo.addressError);
  const dispatch = useDispatch();
  return (
    <>
      {/*Firstname Input*/}
      <Text style={FormStyle.label}>Firstname</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/person.png")}
          style={{ width: 30, height: 30, opacity: 0.6 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(PersonalInfo.handleFirtname(text))}
          value={fname}
          autoComplete="name-given"
        />
      </View>
      {fNameError && <Text style={{ color: "red" }}>{fNameError}</Text>}

      {/*Lastname Input*/}
      <Text style={FormStyle.label}>Lastname</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/person.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(PersonalInfo.handleLastname(text))}
          value={lname}
        />
      </View>
      {lNameError && <Text style={{ color: "red" }}>{lNameError}</Text>}

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
          onChangeText={(text) => dispatch(PersonalInfo.handleContact(text))}
          value={contct}
        />
      </View>
      {cotactError && <Text style={{ color: "red" }}>{cotactError}</Text>}

      {/*Birthdate Input*/}
      <Text style={FormStyle.label}>Birthdate</Text>
      <DatePicker
        birthdate={birthDte}
        setBirthdate={(text) => dispatch(PersonalInfo.hadleBirthdate(text))}
      />
      {birthdateError && <Text style={{ color: "red" }}>{birthdateError}</Text>}

      {/*Address Input*/}
      <Text style={FormStyle.label}>Address</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/location.png")}
          style={{ width: 30, height: 30 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(PersonalInfo.handleAddress(text))}
          value={addrrs}
        />
      </View>
      {addressError && <Text style={{ color: "red" }}>{addressError}</Text>}
    </>
  );
}
