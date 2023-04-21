import {
  View,
  Text,
  FlatList,
  ActivityIndicator,
  Button,
  StyleSheet,
  Image,
  Pressable,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
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
import { server, apiKey } from "../../../../../Static";
import { Title } from "react-native-paper";

export default function MechanicList({ navigation }) {
  const [serviceList, setServiceList] = useState([]);
  const [filterService, setFilter] = useState("all");
  const isEnabled = useSelector(enable);
  const userData = useSelector(data);
  const userID = userData.AccountData.personalInformation.UUID;
  const { inSession } = useSelector((state) => state.requestStatusSlice);
  const { longitude, latitude } = useSelector((state) => state.locationSlice);

  const dispatch = useDispatch();

  const fetchAllServices = async () => {
    try {
      await fetch(`${server}/api/System/Service`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
      })
        .then((res) => res.json())
        .then((services) => setServiceList(services.Services))
        .catch((error) => console.log(error));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    console.log("Filter: " + filterService);
    if (filterService && filterService !== "all") {
      const serviceNeed = DATA.filter((shop) => {
        return shop.service.Info.some((service) => {
          return service.ServiceName === filterService;
        });
      });
      const online = serviceNeed.filter(
        (item) => item.information.accountStatus.IsOnline === false
      );
      setDATA(online);
    } else {
      setDATA(onlines);
    }
    fetchAllServices();
    const time = setInterval(() => {
      dispatch(fetchAsyncData());
      dispatch(checkRequests(userID));
    }, 10000);
    return () => clearInterval(time);
  }, [dispatch, filterService, DATA, availableMechanics]);

  const shops = useSelector(availableMechanics);
  const onlines = shops.filter(
    (item) => item.information.accountStatus.IsOnline === false
  );

  //console.log(JSON.stringify(shops, null, 2));
  const [DATA, setDATA] = useState(onlines);
  const Loading = useSelector(isLoading);

  if (Loading || longitude === "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <ActivityIndicator />
      </View>
    );
  } else if (inSession) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../../../assets/Icons/coming.png")}
          style={{ width: 400, height: 400 }}
        />
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "600" }}>
          You already requested a service
        </Text>
      </View>
    );
  } else if (!isEnabled) {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Image
          source={require("../../../../../assets/Icons/coming.png")}
          style={{ width: 400, height: 400 }}
        />
        <Text style={{ fontSize: 20, textAlign: "center", fontWeight: "600" }}>
          You already requested a service
        </Text>
      </View>
    );
  } else {
    return (
      <View
        style={{
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: "100%",
            height: "30%",
          }}
        >
          <MapView
            style={{
              flex: 1,
              margin: 10,
              borderRadius: 30,
              overflow: "hidden",
              elevation: 5,
            }}
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

        <View
          style={{
            width: "100%",
            paddingHorizontal: 10,
          }}
        >
          <View
            style={{
              backgroundColor: "white",
              borderWidth: 1,
              borderRadius: 10,
              marginBottom: 5,
            }}
          >
            <Picker
              selectedValue={filterService}
              onValueChange={(itemValue, itemIndex) => {
                setFilter(itemValue);
                const filt = shops.filter(
                  (item) => item.information.accountStatus.IsOnline === false
                );
                setDATA(filt);
              }}
              style={{ height: 50, width: "100%" }}
            >
              <Picker.Item label={"All Services"} value={"all"} />
              {serviceList.map(({ ServiceName, ServiceID }) => (
                <Picker.Item
                  label={ServiceName}
                  value={ServiceName}
                  key={ServiceID}
                />
              ))}
            </Picker>
          </View>

          <View
            style={{
              flexDirection: "row",
              width: "100%",
              justifyContent: "space-evenly",
            }}
          >
            <Pressable
              style={{
                backgroundColor: "#228BD4",
                paddingHorizontal: 80,
                paddingVertical: 10,
                borderRadius: 10,
              }}
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
                const filterOn = shops.filter(
                  (item) => item.information.accountStatus.IsOnline === false
                );
                setDATA(null);
                setDATA(filterOn);
              }}
            >
              <Text style={{ color: "white" }}>Near Me</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#E8F1F8",
                paddingHorizontal: 10,
                paddingVertical: 10,
                borderWidth: 1,
                borderRadius: 10,
              }}
              onPress={() => {
                setDATA(null);
                const filter = shops.filter(
                  (item) => item.information.accountStatus.IsOnline === false
                );
                setDATA(filter);
                setFilter("all");
              }}
            >
              <Text>Remove Filter</Text>
            </Pressable>
          </View>
        </View>

        {isEnabled && (
          <FlatList
            data={DATA}
            renderItem={({ item }) => (
              <MechanicCard item={item} navigation={navigation} />
            )}
            style={MainView.flatView}
          />
        )}
      </View>
    );
  }
}
