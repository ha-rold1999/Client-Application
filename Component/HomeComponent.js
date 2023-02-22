import { View, Text } from "react-native";
import homeScreenStyle from "../Style/StyleHomeComponent";
import { NavigationContainer } from "@react-navigation/native";
import { createDrawerNavigator } from "@react-navigation/drawer";
import Main from "./Home/MainComponent/Main";
import Setting from "./Home/SettingComponent/Setting";

export default function HomeScreen() {
  const Drawer = createDrawerNavigator();
  return (
    <NavigationContainer independent={true}>
      <Drawer.Navigator initialRouteName="Main">
        <Drawer.Screen name="Main" component={Main} />
        <Drawer.Screen name="Setting" component={Setting} />
      </Drawer.Navigator>
    </NavigationContainer>
  );
}
