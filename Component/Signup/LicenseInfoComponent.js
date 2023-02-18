import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import DatePicker from "../FormCoponent/DatePickerComponent";

export default function LicenseInfo(props) {
  return (
    <>
      <Text style={FormStyle.label}>License No</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/license.png")}
          style={{ width: 30, height: 30, marginHorizontal: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setLicenseNo}
          value={props.licenseNo}
        />
      </View>
      {props.licenseNoError && (
        <Text style={{ color: "red" }}>{props.licenseNoError}</Text>
      )}
      <Text style={FormStyle.label}>Expiry Date</Text>
      <DatePicker
        birthdate={props.licenseExpDate}
        setBirthdate={props.setExpDate}
      />
      {props.licenseExpDateError && (
        <Text style={{ color: "red" }}>{props.licenseExpDateError}</Text>
      )}
    </>
  );
}
