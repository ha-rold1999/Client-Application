import { StyleSheet, Text, View, TextInput, Button } from "react-native";
import React from "react";
import { useDispatch } from "react-redux";
import { changePassword } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useState } from "react";

export default function ChangePassword({ route, navigation }) {
  const dispatch = useDispatch();
  const info = route.params;
  const UUID = info.uuid;

  const [newPass, setNewPass] = useState("");
  const [confirmPass, setConfirmPass] = useState("");
  const [error, setError] = useState(false);
  return (
    <View>
      <Text>Change Password</Text>
      <Text>Type New Password</Text>
      <TextInput secureTextEntry={true} onChangeText={setNewPass} />
      <Text>Re-type New Password</Text>
      <TextInput secureTextEntry={true} onChangeText={setConfirmPass} />
      {error && <Text>Password does not match</Text>}
      <Button
        title="Change Password"
        onPress={() => {
          if (newPass !== confirmPass) {
            setError(true);
          } else {
            setError(false);
            dispatch(changePassword(UUID, newPass));
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
          }
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
