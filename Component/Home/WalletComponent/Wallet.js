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

  return (
    <View>
      <Text>My Wallet</Text>
      <Text>My Balance: {balance}</Text>
    </View>
  );
}

const styles = StyleSheet.create({});
