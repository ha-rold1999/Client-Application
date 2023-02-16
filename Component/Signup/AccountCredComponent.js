import { View, Text, TextInput, Pressable } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import Checkbox from "expo-checkbox";
import LoginForm from "../../Style/Component/StyleLoginComponent";
import { useState } from "react";

export default function AccountCred() {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <Text style={FormStyle.label}>Username</Text>
      <TextInput style={FormStyle.input} />
      <Text style={FormStyle.label}>Password</Text>
      <TextInput style={FormStyle.input} secureTextEntry />
      <Text style={FormStyle.label}>Re-type Password</Text>
      <TextInput style={FormStyle.input} secureTextEntry />
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Checkbox
          value={isChecked}
          onValueChange={setChecked}
          color={isChecked ? "black" : undefined}
        />
        <Pressable
          onPress={() => {
            isChecked ? setChecked(false) : setChecked(true);
          }}
        >
          <Text style={{ paddingLeft: 5 }}>
            You Agree with the Terms and Service of AYUS
          </Text>
        </Pressable>
      </View>
    </>
  );
}
