import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Main from "./Home/MainComponent/Main";
import Setting from "./Home/SettingComponent/Setting";
import LocationView from "./Home/MapViewComponent/MapView";
import LogoutView from "./Home/LogoutComponent/LogoutView";
import WalletStack from "./Home/WalletComponent/WalletStack";
import { data } from "../Redux/AccountInfoReducers/AccountReducers";
import HistoryTabs from "./Home/HistoryComponent/HistoryTabs";
import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../Redux/MapReducers.js/LocationReducer";
import SuspendedModal from "./Signup/ModalComponent/LoginModalMessage/SuspendedModal";
import { Alert, BackHandler } from "react-native";
import { server } from "../Static";
import PhoneCamera from "./Home/MainComponent/Views/ProfileViews/Camera";

export default function HomeScreen({ navigation }) {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const userInfo = useSelector(data);
  const UUID = userInfo.AccountData.personalInformation.UUID;
  const suspended = userInfo.AccountData.accountStatus.IsLocked;
  const [hasLicense, setHasLicense] = useState(true);
  const [openCamera, setOpenCamera] = useState(false);
  const [isLoaded, setIsLoaded] = useState(true);

  fetch(`${server}/api/Upload/files/${UUID}/LICENSE`)
    .then((response) => {
      if (response.status === 200) {
        setHasLicense(true);
      } else {
        setHasLicense(false);
      }
    })
    .catch((error) => {
      console.log("Error: " + error);
    });

  {
    !hasLicense &&
      !openCamera &&
      Alert.alert(
        "Proof license",
        "Please upload a picture of your drivers license",
        [
          {
            text: "OK",
            onPress: () => {
              setHasLicense(true);
              setOpenCamera(true);
            },
          },
        ]
      );
  }
  useEffect(() => {
    (async () => {
      Alert.alert(
        "Turn on location",
        "Please grant location permission to use this app.",
        [
          {
            text: "Deny",
            onPress: () =>
              navigation.reset({
                index: 0,
                routes: [{ name: "InitialScreen" }],
              }),
            style: "destructive",
          },
          {
            text: "Accept",
            onPress: async () => {
              let location = await Location.getCurrentPositionAsync();
              dispatch(
                getLocation({
                  longitude: location.coords.longitude,
                  latitude: location.coords.latitude,
                  UUID: UUID,
                })
              );
            },
            style: "default",
          },
        ]
      );
    })();
  }, []);

  return (
    <>
      {suspended && <SuspendedModal navigation={navigation}/>}
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="History" component={HistoryTabs} />
        <Drawer.Screen name="Logout" component={LogoutView} />
      </Drawer.Navigator>
      <PhoneCamera
        openCamera={openCamera}
        setOpenCamera={setOpenCamera}
        setIsLoaded={setIsLoaded}
        upload={"LICENSE"}
        setHasLicense={setHasLicense}
      />
    </>
  );
}
