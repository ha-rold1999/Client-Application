import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Pressable,
  Image,
  Linking,
  ScrollView,
} from "react-native";
import { useEffect, useState } from "react";
import { fetchService } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { fetchMechaniLocation } from "../../../../../Redux/MapReducers/MechanicLocationReducer";
import { useDispatch, useSelector } from "react-redux";
import Loading from "../../Loading";
import MechanicLocation from "./MechanicLocation";
import { AirbnbRating, Rating } from "react-native-ratings";
import { getReview } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";
import MechanicModalDetail from "./MechanicModalDetail";

export default function MechanicProfile({ route, navigation }) {
  const ShopData = route.params;
  const mechanicID = ShopData.ShopData.information.personalInformation.UUID;
  const dispatch = useDispatch();
  const { rating } = useSelector((state) => state.requestStatusSlice);
  const longitude = ShopData.ShopData.loc.Data.Longitude;
  const latitude = ShopData.ShopData.loc.Data.Latitude;
  const services = ShopData.ShopData.service.Info;
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    dispatch(getReview(mechanicID, "Mechanic"));
  }, [dispatch]);

  if (
    services !== undefined &&
    longitude !== undefined &&
    latitude !== undefined &&
    rating !== null
  ) {
    return (
      <View style={{ flex: 1 }}>
        <View style={{ flex: 0.3, marginBottom: 5 }}>
          <View style={{ flex: 1 }}>
            <MechanicLocation longitude={longitude} latitude={latitude} />
          </View>
        </View>
        <View style={{ flex: 0.7 }}>
          <View
            style={{
              backgroundColor: "white",
              marginHorizontal: 5,
              borderRadius: 10,
              elevation: 5,
              padding: 10,
              flexDirection: "row",
            }}
          >
            <View style={{ width: "90%" }}>
              <Text style={{ fontSize: 10 }}>
                Shop ID:{" "}
                {ShopData.ShopData.information.accountStatus.Shop.ShopID}
              </Text>
              <Text style={{ fontSize: 20, fontWeight: "700" }}>
                {ShopData.ShopData.information.accountStatus.Shop.ShopName}
              </Text>
              <Text>
                <Rating
                  type="custom"
                  startingValue={rating.Rating}
                  readonly={true}
                  imageSize={20}
                />
              </Text>
              <View
                style={{
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/mechanic.png")}
                  style={{ width: 20, height: 20 }}
                />
                <Text style={{ fontSize: 20, paddingLeft: 5 }}>
                  {ShopData.ShopData.information.personalInformation.Firstname}{" "}
                  {ShopData.ShopData.information.personalInformation.Lastname}
                </Text>
              </View>

              <Pressable
                onPress={() => {
                  const phoneUrl = `tel:${ShopData.ShopData.information.personalInformation.Contact}`;
                  Linking.openURL(phoneUrl);
                }}
              ></Pressable>
            </View>
            <View
              style={{
                flex: 1,
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Pressable
                onPress={() => {
                  setModalVisible(true);
                }}
              >
                <Image
                  source={require("../../../../../assets/Icons/information.png")}
                  style={{ width: 20, height: 20 }}
                />
              </Pressable>
            </View>
          </View>
          <View
            style={{
              flexDirection: "row",
              margin: 10,
              alignContent: "center",
              borderBottomWidth: 1,
            }}
          >
            <Image
              source={require("../../../../../assets/Icons/wrench.png")}
              style={{ width: 20, height: 20 }}
            />
            <Text style={{ fontSize: 20, paddingLeft: 5 }}>Services</Text>
          </View>
          <ScrollView>
            {services.map(({ ServiceName, UUID, Price }) => (
              <View key={UUID} style={{ flexDirection: "row", padding: 10 }}>
                <View style={{ width: "70%" }}>
                  <Text style={{ fontSize: 15, fontWeight: "700" }}>
                    {ServiceName}
                  </Text>
                </View>
                <View
                  style={{
                    width: "30%",
                  }}
                >
                  <Text style={{ fontSize: 15 }}>P{Price}</Text>
                </View>
              </View>
            ))}
          </ScrollView>

          <View style={{ alignItems: "center", paddingBottom: 10 }}>
            <Pressable
              style={{
                backgroundColor: "#209589",
                paddingHorizontal: 50,
                paddingVertical: 10,
                borderRadius: 10,
              }}
              onPress={() =>
                navigation.navigate("RequestService", {
                  mechanicID: mechanicID,
                  longitude: longitude,
                  latitude: latitude,
                  services: services,
                })
              }
            >
              <Text style={{ fontWeight: "700", color: "white" }}>
                Request Service
              </Text>
            </Pressable>
          </View>
        </View>
        <MechanicModalDetail
          modalVisible={modalVisible}
          setModalVisible={setModalVisible}
          details={
            ShopData.ShopData.information.accountStatus.Shop.ShopDescription
          }
        />
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
