import { Button, Pressable, StyleSheet, Text, View } from "react-native";
import React from "react";
import { deleteAccount } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useDispatch } from "react-redux";

export default function DeleteAccout({ route, navigation }) {
  const dispatch = useDispatch();
  const info = route.params;
  const UUID = info.uuid;
  return (
    <View>
      <Text>Are you sure you want to delete this account?</Text>
      <Button
        title="YES"
        onPress={() => {
          dispatch(deleteAccount(UUID));
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({});
