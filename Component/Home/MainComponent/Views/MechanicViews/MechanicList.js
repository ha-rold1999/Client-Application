import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
} from "react-native";
import MechanicCard from "./MechanicCardComponent";
import MainView from "../../../../../Style/Component/MainViewStyles/StyleMainComponent";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  availableMechanics,
  isLoading,
} from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import {
  fetchAsyncData,
  checkRequests,
} from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useDispatch } from "react-redux";
import { enable } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import PhoneCamera from "../ProfileViews/Camera";
import MapView, { Marker } from "react-native-maps";
import * as geolib from "geolib";

export default function MechanicList({ navigation }) {
  const [openCamera, setOpenCamera] = useState(false);
  const isEnabled = useSelector(enable);
  const userData = useSelector(data);
  const userID = userData.AccountData.personalInformation.UUID;
  const { inSession } = useSelector((state) => state.requestStatusSlice);
  const { longitude, latitude } = useSelector((state) => state.locationSlice);

  const dispatch = useDispatch();
  useEffect(() => {
    const time = setInterval(() => {
      dispatch(fetchAsyncData());
      dispatch(checkRequests(userID));
    }, 10000);
    return () => clearInterval(time);
  }, [dispatch]);

  const [DATA, setDATA] = useState(useSelector(availableMechanics));
  const Loading = useSelector(isLoading);

  if (Loading || longitude === "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else if (inSession) {
    return (
      <View>
        <Text>Service on its way</Text>
      </View>
    );
  } else if (!isEnabled) {
    return (
      <View>
        <Text>You already requested a service</Text>
      </View>
    );
  } else {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View style={{ width: "100%", height: "50%", backgroundColor: "red" }}>
          <MapView
            style={{ flex: 1 }}
            provider="google"
            initialRegion={{
              longitude: longitude,
              latitude: latitude,
              latitudeDelta: 0.05,
              longitudeDelta: 0.05,
            }}
          >
            <Marker
              icon={require("../../../../../assets/Icons/person.png")}
              coordinate={{
                longitude: longitude,
                latitude: latitude,
              }}
            />
            {DATA.map((shop) => {
              return (
                <Marker
                  key={shop.information.personalInformation.UUID}
                  icon={require("../../../../../assets/Icons/license.png")}
                  coordinate={{
                    longitude: shop.loc.Data.Longitude,
                    latitude: shop.loc.Data.Latitude,
                  }}
                />
              );
            })}
          </MapView>
        </View>
        {/* <View>
          
        </View> */}
        <Button
          title="Provide Photo"
          onPress={() => {
            setOpenCamera(true);
          }}
        />
        <Button
          title="Get the Mechanics within 5km near me"
          onPress={() => {
            const near = DATA.map((loc) => ({
              ...loc,
              distance: geolib.getDistance(
                {
                  longitude: longitude,
                  latitude: latitude,
                },
                {
                  longitude: loc.loc.Data.Longitude,
                  latitude: loc.loc.Data.Latitude,
                }
              ),
            })).filter((loc) => {
              return loc.distance <= 5000;
            });
            setDATA(null);
            setDATA(near);
          }}
        />
        {isEnabled && (
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <MechanicCard item={item} navigation={navigation} />
            )}
            style={MainView.flatView}
          />
        )}
        <PhoneCamera
          openCamera={openCamera}
          setOpenCamera={setOpenCamera}
          upload={"PROBLEM"}
        />
      </View>
    );
  }
}
