import {
  Button,
  StyleSheet,
  Text,
  View,
  Pressable,
  Linking,
} from "react-native";
import { useSelector, useDispatch } from "react-redux";
import React, { useEffect, useState } from "react";
import { addBalance } from "../../../../../Redux/WalletReducers/WalletReducer";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { getUserWallet } from "../../../../../Redux/WalletReducers/WalletReducer";
import RatingModal from "./RatingModal";
import ReportModal from "./ReportModal";
import { RadioButton } from "react-native-paper";
import { LinearGradient } from "expo-linear-gradient";

export default function ServicePaymet({ route, navigation }) {
  const [isRating, setIsRating] = useState(false);
  const [isReporting, setIsReporting] = useState(false);
  const [checked, setChecked] = useState("");
  const [isDisabled, setIsDisabled] = useState(false);
  const dispatch = useDispatch();
  const { balance } = useSelector((state) => state.walletSlice);
  const profile = useSelector(data);
  const userID = profile.AccountData.personalInformation.UUID;

  const SessionID = route.params;
  const UUID = SessionID.SessionID;
  const ServiceName = SessionID.ServiceName;
  const Fee = SessionID.Fee;
  const mechanicID = SessionID.MechID;

  useEffect(() => {
    dispatch(getUserWallet(userID));
    if (balance <= 0 || balance < Fee) {
      setChecked("cash");
      setIsDisabled(true);
    } else {
      setChecked("wallet");
    }
  }, [dispatch, userID, balance, Fee, setChecked, setIsDisabled]);
  return (
    <LinearGradient
      colors={["#cff5fb", "#fcfdfd"]}
      style={{ flex: 1 }}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={{ paddingHorizontal: 10 }}>
        <View style={{ alignItems: "center" }}>
          <Text style={{ fontSize: 30, fontWeight: "700" }}>Payment</Text>
        </View>

        <View
          style={{
            paddingHorizontal: 20,
            paddingVertical: 10,
            borderWidth: 2,
            borderRadius: 10,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Service Information</Text>
          <Text style={{ fontSize: 20, fontWeight: "700" }}>
            Service: {ServiceName}
          </Text>
          <Text style={{ fontSize: 15, fontWeight: "700" }}>Fee: P {Fee}</Text>
        </View>

        <View
          style={{
            borderWidth: 2,
            marginTop: 20,
            borderRadius: 10,
            paddingHorizontal: 20,
            paddingVertical: 10,
            backgroundColor: "white",
          }}
        >
          <Text style={{ fontWeight: "700" }}>Payment Method</Text>

          <RadioButton.Group
            onValueChange={(value) => setChecked(value)}
            value={checked}
          >
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="wallet" disabled={isDisabled} />
              <Text>AYUS Wallet</Text>
              <Text> (P{balance})</Text>
            </View>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <RadioButton value="cash" />
              <Text>Cash</Text>
            </View>
          </RadioButton.Group>
        </View>

        <View style={{ marginTop: 10 }}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-evenly",
              marginBottom: 10,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "red",
                justifyContent: "center",
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setIsReporting(true);
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Report Client
              </Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#228BD4",
                justifyContent: "center",
                paddingHorizontal: 30,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                setIsRating(true);
              }}
            >
              <Text style={{ color: "white", fontWeight: "700" }}>
                Rate Mechanic
              </Text>
            </Pressable>
          </View>

          <View style={{ alignItems: "center" }}>
            <Pressable
              style={{
                paddingHorizontal: 150,
                paddingVertical: 15,
                backgroundColor: "#209589",
                borderRadius: 10,
              }}
              onPress={() => {
                if (checked === "wallet") {
                  const newBal = parseFloat(balance) - parseFloat(Fee);
                  dispatch(addBalance(userID, newBal));
                  navigation.navigate("ServiceSucces", {
                    SessionID: UUID,
                    ServiceName: ServiceName,
                    Fee: Fee,
                  });
                } else {
                  navigation.navigate("ServiceSucces", {
                    SessionID: UUID,
                    ServiceName: ServiceName,
                    Fee: Fee,
                  });
                }
              }}
            >
              <Text style={{ fontSize: 20, fontWeight: "700", color: "white" }}>
                Pay
              </Text>
            </Pressable>
          </View>
        </View>

        <RatingModal modalVisible={isRating} setModalVisible={setIsRating} />
        <ReportModal
          modalVisible={isReporting}
          setModalVisible={setIsReporting}
          userID={userID}
        />
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({});
