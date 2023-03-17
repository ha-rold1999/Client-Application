import { Button, StyleSheet, Text, View } from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addBalance } from "../../../../../Redux/WalletReducers/WalletReducer";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { getUserWallet } from "../../../../../Redux/WalletReducers/WalletReducer";
import RatingModal from "./RatingModal";

export default function ServicePaymet({ route, navigation }) {
  const [isRating, setIsRating] = useState(false);
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.walletSlice);
  const profile = useSelector(data);
  const userID = profile.AccountData.personalInformation.UUID;

  const SessionID = route.params;
  const UUID = SessionID.SessionID;
  const ServiceName = SessionID.ServiceName;
  const Fee = SessionID.Fee;

  useEffect(() => {
    dispatch(getUserWallet(userID));
  }, [dispatch]);
  return (
    <View>
      <Text>Payment</Text>
      <Text>Service: {ServiceName}</Text>
      <Text>Fee: {Fee}</Text>
      <></>
      <Text>Balance</Text>
      <Text>P{balance}</Text>
      <Button
        title="Rate Mechanic?"
        onPress={() => {
          setIsRating(true);
        }}
      />
      <Button
        title="Pay"
        onPress={() => {
          const newBal = parseFloat(balance) - parseFloat(Fee);
          dispatch(addBalance(userID, newBal));
          navigation.navigate("ServiceSucces", {
            SessionID: UUID,
            ServiceName: ServiceName,
            Fee: Fee,
          });
        }}
      />
      <RatingModal modalVisible={isRating} setModalVisible={setIsRating} />
    </View>
  );
}

const styles = StyleSheet.create({});
