import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import DatePicker from "../FormCoponent/DatePickerComponent";

export default function LicenseInfo() {
  return (
    <>
      <Text style={FormStyle.label}>License No</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/license.png")}
          style={{ width: 30, height: 30, marginHorizontal: 5 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
      <Text style={FormStyle.label}>Expiry Date</Text>
      <DatePicker />
    </>
  );
}
