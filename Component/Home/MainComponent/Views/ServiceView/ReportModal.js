import { StyleSheet, Text, View, Modal, Button, TextInput } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";

export default function ReportModal(props) {
  const [reportSubmitted, setReportSubmitted] = useState(false);
  const { mechanicID } = useSelector((state) => state.requestServiceSlice);

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
        <TextInput multiline />

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
          }}
        />
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({});
