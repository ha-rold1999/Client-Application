import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React, { useEffect } from "react";
import { getSessionLocation } from "../../../../../Redux/MapReducers.js/LocationReducer";
import { useDispatch, useSelector } from "react-redux";
import MapView, { Marker } from "react-native-maps";

export default function SessionMap({ sessionID }) {
  const { sessionMap } = useSelector((state) => state.locationSlice);
  const dispatch = useDispatch();
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(getSessionLocation(sessionID));
    }, 5000);

    return () => clearInterval(time);
  }, [dispatch]);

  if (sessionMap !== null) {
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
