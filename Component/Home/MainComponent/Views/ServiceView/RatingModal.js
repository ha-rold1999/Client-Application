import { StyleSheet, Text, View, Modal, Button } from "react-native";
import { AirbnbRating } from "react-native-ratings";
import { useDispatch, useSelector } from "react-redux";
import React, { useState } from "react";
import { postReview } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";

export default function RatingModal(props) {
  const dispatch = useDispatch();
  const { mechanicID } = useSelector((state) => state.requestServiceSlice);
  const [rating, setRating] = useState(0);
  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={props.modalVisible}
    >
      <Text>{mechanicID}</Text>
      <AirbnbRating
        onFinishRating={(rating) => {
          setRating(rating);
        }}
      />
      <Button
        title="Cancel"
        onPress={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      />
      <Button
        title="Submit Reting"
        onPress={() => {
          dispatch(postReview(mechanicID, rating));
          props.setModalVisible(!props.modalVisible);
        }}
      />
    </Modal>
  );
}

const styles = StyleSheet.create({});
