import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Button,
  View,
  Text,
} from "react-native";
import React, { useEffect } from "react";
import { getSessionLocation } from "../../../../../Redux/MapReducers.js/LocationReducer";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";
import { postTransaction } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";

export default function SessionMap({ sessionID, navigation }) {
  const { sessionMap } = useSelector((state) => state.locationSlice);
  const { sessionDetails } = useSelector((state) => state.requestStatusSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(getSessionLocation(sessionID));
    }, 5000);

    return () => clearInterval(time);
  }, [dispatch]);

  if (sessionMap !== null) {
    const datas = sessionDetails.split("|");
    const serviceDetails = datas[0].split(":");
    const serviceName = serviceDetails[1];
    const servicePrice = serviceDetails[2];
    return (
      <View>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            longitude: sessionMap.ClientLocLon,
            latitude: sessionMap.ClientLocLat,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            icon={require("../../../../../assets/Icons/license.png")}
            coordinate={{
              longitude: sessionMap.MechanicLocLon,
              latitude: sessionMap.MechanicLocLat,
            }}
          />
          <Marker
            icon={require("../../../../../assets/Icons/person.png")}
            coordinate={{
              longitude: sessionMap.ClientLocLon,
              latitude: sessionMap.ClientLocLat,
            }}
          />
        </MapView>
        <Text>Service Requested: {serviceName}</Text>
        <Text>Fee: {servicePrice}</Text>
        <Button
          title="Done"
          onPress={() => {
            navigation.navigate("ServicePayment", {
              SessionID: sessionID,
              ServiceName: serviceName,
              Fee: servicePrice,
            });
          }}
        />
      </View>
    );
  } else {
    return <ActivityIndicator />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 0.2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "400%",
    maxHeight: 400,
  },
});
