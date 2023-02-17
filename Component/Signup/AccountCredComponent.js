import { View, Text, TextInput, Pressable, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export default function AccountCred() {
  const [isChecked, setChecked] = useState(false);
  return (
    <>
      <Text style={FormStyle.label}>Username</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/username.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
      <Text style={FormStyle.label}>Password</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/password.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
      <Text style={FormStyle.label}>Re-type Password</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/password.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput style={FormStyle.input} />
      </View>
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
