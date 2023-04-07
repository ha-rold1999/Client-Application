import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MechanicLocation({ longitude, latitude }) {
  if (longitude) {
    return (
      <View style={styles.container}>
        <MapView
          style={styles.map}
          provider="google"
          initialRegion={{
            longitude: longitude,
            latitude: latitude,
            latitudeDelta: 0.05,
            longitudeDelta: 0.05,
          }}
        >
          <Marker
            icon={require("../../../../../assets/Icons/license.png")}
            coordinate={{
              longitude: longitude,
              latitude: latitude,
            }}
          />
        </MapView>
      </View>
    );
  } else {
    return (
      <View>
        <ActivityIndicator />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    justifyContent: "center",
    padding: 5,
    elevation: 5,
    marginHorizontal: 5,
  },
  map: {
    width: "100%",
    height: "100%",
  },
});
