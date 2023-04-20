import { Modal, StyleSheet, Text, View, Image } from "react-native";
import React from "react";
import modelStyle from "../../../../Style/Component/Modal/StyleModelComponent";

export default function SuspendedModal(props) {
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
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
