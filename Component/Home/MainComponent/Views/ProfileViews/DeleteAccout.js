import {
  Button,
  Pressable,
  StyleSheet,
  Text,
  View,
  Image,
  ToastAndroid,
} from "react-native";
import React from "react";
import { deleteAccount } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useDispatch } from "react-redux";

export default function DeleteAccout({ route, navigation }) {
  const dispatch = useDispatch();
  const info = route.params;
  const UUID = info.uuid;
  return (
    <View style={{ flex: 1 }}>
      {/* <Image source={require("../../../../../assets/Icons/trash.png")} /> */}
      <View
        style={{
          width: "100%",
          height: "50%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text style={{ fontSize: 30, fontWeight: "bold", paddingBottom: 20 }}>
          Delete Account
        </Text>
        <Image
          source={require("../../../../../assets/Icons/trash.png")}
          style={{ width: 200, height: 200 }}
        />
      </View>
      <View style={{ alignItems: "center" }}>
        <Text style={{ fontSize: 20, textAlign: "center", paddingBottom: 30 }}>
          Are you sure you want to delete this account?
        </Text>
        <Pressable
          onPress={() => {
            dispatch(deleteAccount(UUID));
            navigation.reset({ index: 0, routes: [{ name: "Login" }] });
            ToastAndroid.show("Account Deleted", ToastAndroid.SHORT);
          }}
          style={{
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            marginBottom: 10,
          }}
        >
          <Text style={{ fontSize: 20 }}>yes</Text>
        </Pressable>
        <Pressable
          onPress={() => {
            navigation.navigate("ProfileView");
          }}
          style={{
            borderWidth: 1,
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderRadius: 10,
            backgroundColor: "#228BD4",
          }}
        >
          <Text style={{ fontSize: 20 }}>NO</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({});
