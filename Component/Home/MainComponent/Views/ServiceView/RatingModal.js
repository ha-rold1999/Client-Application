import {
  StyleSheet,
  Text,
  View,
  Modal,
  Button,
  Pressable,
  Image,
} from "react-native";
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
              Rate the service
            </Text>
          </View>
          <View>
            <AirbnbRating
              onFinishRating={(rating) => {
                setRating(rating);
              }}
            />
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
                  dispatch(postReview(mechanicID, rating));
                  props.setModalVisible(!props.modalVisible);
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
