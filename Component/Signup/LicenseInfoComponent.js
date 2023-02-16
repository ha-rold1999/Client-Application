import { View, Text, TextInput, Pressable } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";

export default function LicenseInfo() {
  return (
    <>
      <Text style={FormStyle.label}>License No</Text>
      <TextInput style={FormStyle.input} />
      <Text style={FormStyle.label}>Expiry Date</Text>
      <TextInput style={FormStyle.input} />
    </>
  );
}
