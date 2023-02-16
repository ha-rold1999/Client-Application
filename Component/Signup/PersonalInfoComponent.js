import { View, Text, TextInput, Pressable } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";

export default function PersonalInformation() {
  return (
    <>
      <Text style={FormStyle.label}>Firstname</Text>
      <TextInput style={FormStyle.input} />
      <Text style={FormStyle.label}>Lastname</Text>
      <TextInput style={FormStyle.input} />
      <Text style={FormStyle.label}>Contact</Text>
      <TextInput keyboardType="number-pad" style={FormStyle.input} />
      <Text style={FormStyle.label}>Birthdate</Text>
      <TextInput style={FormStyle.input} />
      <Text style={FormStyle.label}>Address</Text>
      <TextInput style={FormStyle.input} />
    </>
  );
}
