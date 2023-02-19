import { View, Text, TextInput, Pressable, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import Checkbox from "expo-checkbox";
import { useState } from "react";

export default function AccountCred(props) {
  return (
    <>
      {/*Email Input*/}
      <Text style={FormStyle.label}>Email</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/email.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setEmail}
          value={props.email}
        />
      </View>
      {props.emailError && (
        <Text style={{ color: "red" }}>{props.emailError}</Text>
      )}

      {/*Username Input*/}
      <Text style={FormStyle.label}>Username</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/username.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setUsername}
          value={props.username}
        />
      </View>
      {props.usernameError && (
        <Text style={{ color: "red" }}>{props.usernameError}</Text>
      )}

      {/*Password Input*/}
      <Text style={FormStyle.label}>Password</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/password.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setPassword}
          value={props.password}
          secureTextEntry
        />
      </View>
      {props.passwordError && (
        <Text style={{ color: "red" }}>{props.passwordError}</Text>
      )}

      {/*Password Confirmation Input*/}
      <Text style={FormStyle.label}>Re-type Password</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/password.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={props.setPasswordConfirmation}
          value={props.passwordConfirmation}
          secureTextEntry
        />
      </View>
      {props.passwordConfirmationError && (
        <Text style={{ color: "red" }}>{props.passwordConfirmationError}</Text>
      )}

      {/*Terms and Conditions*/}
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Checkbox
          value={props.isChecked}
          onValueChange={props.setChecked}
          color={props.isChecked ? "black" : undefined}
        />
        <Pressable
          onPress={() => {
            props.isChecked ? props.setChecked(false) : props.setChecked(true);
          }}
        >
          <Text style={{ paddingLeft: 5 }}>
            You Agree with the Terms and Service of AYUS
          </Text>
        </Pressable>
      </View>
      {props.isCheckedError && (
        <Text style={{ color: "red" }}>{props.isCheckedError}</Text>
      )}
    </>
  );
}
