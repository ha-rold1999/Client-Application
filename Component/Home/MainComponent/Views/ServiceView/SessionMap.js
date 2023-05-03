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
import Loading from "../../Loading";

export default function SessionMap({ sessionID, navigation }) {
  const { sessionMap } = useSelector((state) => state.locationSlice);
  const { sessionDetails } = useSelector((state) => state.requestStatusSlice);
  const { mechID } = useSelector((state) => state.requestStatusSlice);
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
        <View
          style={{
            flex: 1,
            backgroundColor: "white",
            paddingHorizontal: 10,
            elevation: 10,
            borderRadius: 20,
            paddingTop: 10,
          }}
        >
          <Text>Service Requested: </Text>
          <View
            style={{ flexDirection: "row", justifyContent: "space-between" }}
          >
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              {serviceName}
            </Text>
            <Text style={{ fontSize: 20, fontWeight: "700" }}>
              P {servicePrice}
            </Text>
          </View>
          <View
            style={{
              alignItems: "center",
              justifyContent: "flex-end",
              marginTop: 50,
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#209589",
                paddingHorizontal: 80,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() => {
                navigation.navigate("ServicePayment", {
                  SessionID: sessionID,
                  ServiceName: serviceName,
                  Fee: servicePrice,
                  MechID: mechID,
                });
              }}
            >
              <Text style={{ color: "white", fontSize: 20, fontWeight: "500" }}>
                Done
              </Text>
            </Pressable>
          </View>

          {/* <Button
            title="Done"
            onPress={() => {
              navigation.navigate("ServicePayment", {
                SessionID: sessionID,
                ServiceName: serviceName,
                Fee: servicePrice,
              });
            }}
          /> */}
        </View>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
      </View>
    );
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
