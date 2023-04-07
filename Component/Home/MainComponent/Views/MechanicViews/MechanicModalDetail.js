import { StyleSheet, Text, View, Modal, Button, Pressable } from "react-native";
import React from "react";

export default function MechanicModalDetail(props) {
  return (
    <Modal
      animationType="slide"
      visible={props.modalVisible}
      transparent={true}
    >
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
          paddingHorizontal: 20,
        }}
      >
        <View
          style={{
            width: "100%",
            backgroundColor: "#E8F1F8",
            borderRadius: 10,
            paddingHorizontal: 30,
            paddingVertical: 10,
            position: "relative",
            elevation: 10,
          }}
        >
          <Pressable
            onPress={() => {
              props.setModalVisible(false);
            }}
            style={{
              backgroundColor: "#228BD4",
              position: "absolute",
              top: 10,
              right: 10,
              borderRadius: 10,
              paddingHorizontal: 5,
            }}
          >
            <Text>X</Text>
          </Pressable>
          <Text style={{ paddingTop: 20 }}>Details</Text>
          <Text>{props.details}</Text>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
