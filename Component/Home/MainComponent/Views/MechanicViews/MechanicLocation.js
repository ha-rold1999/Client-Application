import { ActivityIndicator, StyleSheet, Text, View } from "react-native";
import React from "react";
import MapView, { Marker } from "react-native-maps";

export default function MechanicLocation({ longitude, latitude }) {
  if (longitude) {
    return (
      <View>
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
    flex: 0.2,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  map: {
    width: "100%",
    height: "100%",
    maxHeight: 400,
  },
});
