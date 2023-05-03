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
import Loading from "../../Loading";
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
import {
  enable,
  requestID,
} from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import PhoneCamera from "../ProfileViews/Camera";
import MapView, { Marker } from "react-native-maps";
import * as geolib from "geolib";
import { server, apiKey } from "../../../../../Static";
import { Title } from "react-native-paper";
import { fetchDeleteReq } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";

export default function MechanicList({ navigation }) {
  const [serviceList, setServiceList] = useState([]);
  const [filterService, setFilter] = useState("all");
  const isEnabled = useSelector(enable);
  const request = useSelector(requestID);
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
    if (filterService && filterService !== "all") {
      const serviceNeed = DATA.filter((shop) => {
        return shop.service.Info.some((service) => {
          return service.ServiceName === filterService;
        });
      });
      setDATA(serviceNeed);
    } else {
      setDATA(onlines);
    }
    fetchAllServices();
    const time = setInterval(() => {
      dispatch(fetchAsyncData());
      dispatch(checkRequests(userID));
    }, 500);
    return () => clearInterval(time);
  }, [dispatch, filterService, DATA, availableMechanics, shops, onlines]);

  const shops = useSelector(availableMechanics);
  const onlines = shops.filter((item) => item.loc.Status !== 404);

  const [DATA, setDATA] = useState(onlines);
  const Loading = useSelector(isLoading);

  if (Loading || longitude === "") {
    return (
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <Loading />
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
        <Pressable
          style={{
            backgroundColor: "red",
            paddingHorizontal: 40,
            paddingVertical: 10,
            borderRadius: 10,
            borderWidth: 1,
          }}
          onPress={() => {
            dispatch(fetchDeleteReq(request));
            navigation.reset({
              index: 0,
              routes: [{ name: "MechanicList" }],
            });
          }}
        >
          <Text style={{ color: "white", fontWeight: "500" }}>
            Cancel Request
          </Text>
        </Pressable>
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
                paddingHorizontal: 50,
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
                setDATA(null);
                setDATA(near);
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
                setDATA(shops);
                setFilter("all");
              }}
            >
              <Text>Remove Filter</Text>
            </Pressable>
            <Pressable
              style={{
                backgroundColor: "#E8F1F8",
                paddingHorizontal: 5,
                paddingVertical: 5,
                borderWidth: 1,
                borderRadius: 10,
                justifyContent: "center",
              }}
              onPress={() => {
                setDATA(shops);
                setFilter("all");
              }}
            >
              <Image
                source={require("../../../../../assets/Icons/refresh.png")}
                style={{ width: 20, height: 20 }}
              />
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
