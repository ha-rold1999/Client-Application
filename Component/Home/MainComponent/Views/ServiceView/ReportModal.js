import { StyleSheet, Text, View, Modal, Button, TextInput } from "react-native";
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
    setTimeout(() => {
      props.setModalVisible(false);
    }, 5000);
  };
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <View style={{ backgroundColor: "red" }}>
        <Text>{mechanicID}</Text>
        <Text>Report Details</Text>
        <TextInput
          onChangeText={(text) => {
            setComplaine(text);
          }}
          multiline
        />

        {reportSubmitted && (
          <View style={{ backgroundColor: "blue" }}>
            <Text>Report Submitted to admin</Text>
          </View>
        )}
        <Button
          title="Cancel"
          onPress={() => {
            props.setModalVisible(!props.modalVisible);
          }}
        />
        <Button
          title="Submit Report"
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
                    "Report Response: " + JSON.stringify(response, null, 2)
                  );
                })
                .catch((error) => console.log(error));
            } catch (error) {
              console.log(error);
            }
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
