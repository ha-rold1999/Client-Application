import { Button, StyleSheet, Text, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { TextInput } from "react-native-gesture-handler";
import {
  addBalance,
  getUserWallet,
} from "../../../Redux/WalletReducers/WalletReducer";
import { data } from "../../../Redux/AccountInfoReducers/AccountReducers";

export default function Wallet({ navigation }) {
  const [isAdding, setIsAdding] = useState(false);
  const [addBal, setAddBal] = useState(0);

  const dispatch = useDispatch();
  const profile = useSelector(data);
  const UUID = profile.AccountData.personalInformation.UUID;

  const { balance } = useSelector((state) => state.walletSlice);

  useEffect(() => {
    dispatch(getUserWallet(UUID));
  }, [isAdding, balance, dispatch]);

  if (isAdding) {
    return (
      <View>
        <Text>Enter the amout you add</Text>
        <TextInput
          onChangeText={(text) => {
            setAddBal(text);
          }}
          keyboardType="number-pad"
          required
        />
        <Button
          title="Submit"
          onPress={() => {
            const newBal = parseFloat(addBal) + parseFloat(balance);
            dispatch(addBalance(UUID, newBal));
            setIsAdding(false);
            setAddBal(0);
            navigation.navigate("Wallet");
          }}
        />
      </View>
    );
  } else {
    return (
      <View>
        <Text>My Wallet</Text>
        <Text>My Balance: {balance}</Text>
        <Button title="Add Balance" onPress={() => setIsAdding(true)} />
      </View>
    );
  }
}

const styles = StyleSheet.create({});
