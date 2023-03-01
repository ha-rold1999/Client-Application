
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Main from "./Home/MainComponent/Main";
import Setting from "./Home/SettingComponent/Setting";
import LocationView from "./Home/MapViewComponent/MapView";
import { data } from "../Redux/AccountInfoReducers/AccountReducers";

import * as Location from "expo-location";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLocation } from "../Redux/MapReducers.js/LocationReducer";

export default function HomeScreen() {
  const Drawer = createDrawerNavigator();
  const dispatch = useDispatch();
  const userInfo = useSelector(data)
  const UUID = userInfo.AccountData.personalInformation.UUID

  useEffect(() => {
    (async () => {
      let {status} = await Location.requestForegroundPermissionsAsync();
      if(status !== "granted"){
        BackHandler.exitApp();
      }
      let location = await Location.getCurrentPositionAsync()
      dispatch(getLocation({longitude:location.coords.longitude, latitude:location.coords.latitude, UUID:UUID}))
    })();
  },[]);

  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Setting" component={Setting} />
        <Drawer.Screen name="Map" component={LocationView}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
