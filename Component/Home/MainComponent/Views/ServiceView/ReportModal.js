import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  TextInput,
  Image,
  Pressable,
  ToastAndroid,
} from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { server, apiKey } from "../../../../../Static";

export default function ReportModal(props) {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const [complaine, setComplaine] = useState("");
  const { mechanicID } = useSelector((state) => state.requestServiceSlice);
  const userID = props.userID;

  const handleSubmit = () => {
    setReportSubmitted(true);
    props.setModalVisible(false);
    setReportSubmitted(false);
  };
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
        }}
      >
        <View
          style={{
            backgroundColor: "white",
            paddingHorizontal: 10,
            paddingVertical: 10,
            borderRadius: 20,
            width: "90%",
            elevation: 100,
          }}
        >
          <View style={{ alignItems: "flex-end" }}>
            <Pressable
              onPress={() => {
                props.setModalVisible(!props.modalVisible);
              }}
            >
              <Image
                source={require("../../../../../assets/Icons/cancel.png")}
                style={{ width: 20, height: 20 }}
              />
            </Pressable>
          </View>
          <View style={{ alignItems: "center" }}>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              Report Details
            </Text>
            <TextInput
              style={{
                width: "100%",
                borderWidth: 1,
                fontSize: 15,
                padding: 5,
                borderRadius: 10,
                textAlignVertical: "top",
              }}
              onChangeText={(text) => {
                setComplaine(text);
              }}
              multiline
              numberOfLines={5}
            />

            {reportSubmitted &&
              ToastAndroid.show(
                "Report Submitted to Admin",
                ToastAndroid.SHORT
              )}
          </View>
          <View>
            <View
              style={{
                flexDirection: "row",
                justifyContent: "space-evenly",
                paddingTop: 30,
              }}
            >
              <Pressable
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: "#228BD4",
                  paddingVertical: 10,
                  elevation: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  props.setModalVisible(!props.modalVisible);
                }}
              >
                <Text style={{ color: "white", fontSize: 15 }}>Cancel</Text>
              </Pressable>
              <Pressable
                style={{
                  paddingHorizontal: 20,
                  backgroundColor: "#209589",
                  paddingVertical: 10,
                  elevation: 10,
                  borderRadius: 10,
                }}
                onPress={() => {
                  handleSubmit();
                  try {
                    fetch(`${server}/api/Account/Report`, {
                      method: "POST",
                      headers: {
                        "Content-Type": "application/json",
                        "AYUS-API-KEY": apiKey,
                      },
                      body: JSON.stringify({
                        complainer: userID,
                        complainee: mechanicID,
                        reason: complaine,
                      }),
                    })
                      .then((res) => res.json())
                      .then((response) => {
                        console.log(
                          "Report Response: " +
                            JSON.stringify(response, null, 2)
                        );
                      })
                      .catch((error) => console.log(error));
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Text
                  style={{ color: "white", fontSize: 15, fontWeight: "700" }}
                >
                  Submit
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
