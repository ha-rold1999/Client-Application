import { Modal, StyleSheet, Text, View, Image, Pressable } from "react-native";
import React from "react";
import modelStyle from "../../../../Style/Component/Modal/StyleModelComponent";
import { deleteAccountData } from "../../../../Redux/AccountInfoReducers/AccountReducers";
import { useDispatch } from "react-redux";

export default function SuspendedModal(props) {
  const navigation = props.navigation;
  const dispatch= useDispatch()
  return (
    <Modal animationType="slide" transparent={true} visible={true}>
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{
            width: "90%",
            backgroundColor: "white",
            justifyContent: "center",
            alignItems: "center",
            padding: 10,
            borderRadius: 10,
            borderWidth: 1,
            elevation: 50,
          }}
        >
          <Image
            source={require("../../../../assets/Icons/warning.png")}
            style={modelStyle.icon}
          />
          <Text style>Your account has been suspended.</Text>
          <Text>Please contact AYUS admin</Text>
          <Text>AYUS@gmail.com</Text>
          <Pressable
        style={{
          backgroundColor: "#02599B",
          paddingHorizontal: 100,
          paddingVertical: 10,
          borderRadius: 10,
          marginTop: 10,
        }}
        onPress={() => {
          dispatch(deleteAccountData(""));
          navigation.reset({ index: 0, routes: [{ name: "Login" }] });
        }}
      >
        <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
          Logout
        </Text>
      </Pressable>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
