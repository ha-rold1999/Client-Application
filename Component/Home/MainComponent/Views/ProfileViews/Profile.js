import {
  View,
  Text,
  Button,
  ActivityIndicator,
  Image,
  TouchableOpacity,
  ToastAndroid,
  StyleSheet,
  Pressable,
  Linking,
  ScrollView,
  RefreshControl
} from "react-native";
import { data } from "../../../../../Redux/AccountInfoReducers/AccountReducers";
import { useSelector, useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { checkRequests } from "../../../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { AirbnbRating, Rating } from "react-native-ratings";
import { getReview } from "../../../../../Redux/MechanicReducers/RequestStatusReducers";
import PhoneCamera from "./Camera";
import { server, adminserver } from "../../../../../Static";
import * as Clipboard from "expo-clipboard";
import Icon from "react-native-vector-icons/FontAwesome";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../../../../../Style/Component/StyleComponent";
import { getUserWallet } from "../../../../../Redux/WalletReducers/WalletReducer";
import Loading from "../../Loading";
import { currancyFormat } from "../../../../../Static";

export default function Profile({ navigation }) {
  const [copyID, setCopyID] = useState("");

  const [isLoaded, setIsLoaded] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  const [isExpired, setExpired] = useState(false);

  const [imageUrl, setImageURL] = useState("");
  const [openCamera, setOpenCamera] = useState(false);
  const profile = useSelector(data);
  const { Profile } = useSelector((state) => state.informationSlice);
  const dispatch = useDispatch();
  const { myRating } = useSelector((state) => state.requestStatusSlice);
  const ID = profile.AccountData.personalInformation.UUID;
  const { balance } = useSelector((state) => state.walletSlice);
  const [refreshing, setRefreshing] = useState(false);

  const onRefresh = () => {
    setRefreshing(true);

    // perform your refresh logic here

    setRefreshing(false);
  }

  const currentDate = new Date();
  const licenseDate = new Date(
    profile.AccountData.personalInformation.Expiry.split("T")[0]
  );

  useEffect(() => {
    dispatch(checkRequests(ID));
    dispatch(getUserWallet(ID));
    dispatch(
      getReview(profile.AccountData.personalInformation.UUID, "Profile")
    );
    if (licenseDate.getTime() < currentDate.getTime()) {
      setExpired(true);
    }
  }, [dispatch, imageLoading]);

  const image = `${server}/api/Upload/files/${ID}/PROFILE`;
  if (!isLoaded) {
    setImageURL(image + "?" + new Date());
    setIsLoaded(true);
  }

  const handleImageLoad = () => {
    setImageLoading(false);
    setImageError(false);
  };
  const handleImageLoadFail = () => {
    setImageLoading(false);
    setImageError(true);
  };

  if (myRating !== null) {
    return (

      
      <LinearGradient
        colors={["#cff5fb", "#fcfdfd"]}
        style={{ flex: 2 }}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={{ flex: 1 }}>
          {/* ID */}
          {/* <View style={{ flexDirection: "row" }}>
            <TouchableOpacity
              onPress={() => {
                Clipboard.setStringAsync(
                  profile.AccountData.personalInformation.UUID
                );
                ToastAndroid.show("Text Copied", ToastAndroid.SHORT);
              }}
              style={{ flexDirection: "row", alignItems: "center" }}
            >
              
              <View style={{ alignItems: "flex-end" }}>
                <Image
                  source={require("../../../../../assets/Icons/copy.png")}
                  style={{ width: 15, height: 15 }}
                />
              </View>
              <Text>Copy ID</Text>
            </TouchableOpacity>
          </View> */}

          {/* Card View */}
          <View
            style={{
              width: "100%",
              height: "30%",
              backgroundColor: "#fff",
              borderRadius: 10,
              elevation: 3,
              padding: 10,
              marginVertical: 10,
              marginRight: 10,
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <View
              style={{
                backgroundColor: "#E8F1F8",
                width: "30%",
                height: "60%",
                elevation: 4,
                borderRadius: 100,
              }}
            >
              <Image
                source={{ uri: imageUrl }}
                style={{ width: "100%", height: "100%", borderRadius: 100 }}
                onLoad={() => {
                  handleImageLoad();
                }}
                onError={() => {
                  handleImageLoadFail();
                }}
              />
              {imageLoading && (
                <ActivityIndicator
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                />
              )}
              {imageError && (
                <Image
                  source={require("../../../../../assets/Icons/placeholder.png")}
                  style={{
                    width: "100%",
                    height: "100%",
                    borderRadius: 100,
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                  }}
                />
              )}

              <TouchableOpacity
                onPress={() => {
                  setOpenCamera(true);
                }}
                style={style.button}
              >
                <Icon name="camera-retro" size={20} style={style.icon} />
              </TouchableOpacity>
            </View>
            <View
              style={{
                width: "50%",
                marginLeft: 10,
              }}
            >
              <Text
                adjustsFontSizeToFit={true}
                numberOfLines={2}
                style={{ fontSize: 30, fontWeight: "bold" }}
              >
                {profile.AccountData.personalInformation.Firstname}{" "}
                {profile.AccountData.personalInformation.Lastname}
              </Text>
              <Text>Client</Text>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Rating
                  type="custom"
                  startingValue={myRating.Rating}
                  readonly={true}
                  imageSize={20}
                />
                <Text style={{ fontSize: 20 }}>
                  {myRating.Rating.toFixed(2)}/5
                </Text>
              </View>
              <View style={{ flexDirection: "row", alignItems: "center" }}>
                <Image
                  source={require("../../../../../assets/Icons/wallet.png")}
                  style={{ width: 20, height: 20, marginRight: 5 }}
                />
                <Text>{currancyFormat.format(balance)}</Text>
                <Pressable
                  style={{
                    borderRadius: 20,
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                  onPress={() => {
                    let url = `${adminserver}/gcash?merchant=AYUS@ICTEAM&amount=100&redirecturl=AYUS_UID_${ID}_AMT_100`;
                    console.log(url);
                    Linking.openURL(url);
                  }}
                >
                  <Image
                    source={require("../../../../../assets/Icons/add.png")}
                    style={{ width: 30, height: 30 }}
                  />
                </Pressable>
              </View>
            </View>
            <View
              style={{
                width: "15%",
                alignItems: "center",
              }}
            >
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate("ChangeProf");
                }}
                style={style.button}
              >
                <Icon name="edit" size={40} style={style.icon} />
              </TouchableOpacity>
            </View>
          </View>

          {/* Details */}
          <View style={style.detailContainers}>
            <View style={{ width: "10%", alignItems: "center" }}>
              <Icon name="phone" size={25} style={style.labelIcon} />
              <Icon
                name="map-marker"
                size={25}
                style={{ ...style.labelIcon, paddingBottom: 35 }}
              />
              <Image
                source={require("../../../../../assets/Icons/expired.png")}
                style={{ width: 25, height: 25 }}
              />
            </View>
            <View style={style.detailInfoContainer}>
              <Text style={style.lebelText}>Contact Number</Text>
              <Text style={style.lebelText}>Address</Text>
              <Text style={style.lebelText}>License Expiry</Text>
            </View>
            <View style={style.detailInfoContainer}>
              <Text style={{ ...style.lebelText, fontWeight: "800" }}>
                {profile.AccountData.personalInformation.Contact}
              </Text>
              <Text style={{ ...style.lebelText, fontWeight: "800" }}>
                {profile.AccountData.personalInformation.Address}
              </Text>
              <Text style={{ ...style.lebelText, fontWeight: "800" }}>
                {profile.AccountData.personalInformation.Expiry.split("T")[0]}
              </Text>
              {isExpired && (
                <View
                  style={{
                    backgroundColor: "yellow",
                    alignItems: "center",
                    padding: 10,
                    margin: 10,
                  }}
                >
                  <Text style={{ textAlign: "center" }}>
                    License Already Expired
                  </Text>
                </View>
              )}
            </View>
          </View>
          <View style={{alignItems:"center"}}>

          <Pressable style={{paddingVertical:10, paddingHorizontal:40, backgroundColor:"#209589", margin:10, borderRadius:10}} onPress={()=>{navigation.reset({ index: 0, routes: [{ name: "ProfileView" }] });}}>
            <Text style={{color:"white"}}>Refresh Profile</Text>
          </Pressable>
          </View>

          <PhoneCamera
            openCamera={openCamera}
            setOpenCamera={setOpenCamera}
            upload={"PROFILE"}
            setIsLoaded={setIsLoaded}
          />
        </View>
      </LinearGradient>
    );
  }
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Loading />
    </View>
  );
}

const style = StyleSheet.create({
  button: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 10,
  },
  icon: {
    color: "grey",
  },
  text: {
    color: "white",
    paddingLeft: 5,
  },
  labelIcon: {
    color: "black",
    paddingVertical: 18,
  },
  lebelText: {
    fontSize: 15,
    paddingVertical: 20,
    paddingLeft: 10,
  },
  lebelContainer: {
    flexDirection: "row",
    alignItems: "center",
    paddingLeft: 10,
  },
  detailContainers: {
    flex: 1,
    flexDirection: "row",
  },
  detailInfoContainer: {
    width: "45%",
    height: "100%",
  },
});
