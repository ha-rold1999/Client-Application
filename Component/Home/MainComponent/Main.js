import Profile from "./Views/ProfileViews/Profile";
import MechanicStack from "./Views/MechanicViews/MechanicStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enable } from "../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useSelector } from "react-redux";
import ServiceStatusStack from "./Views/ServiceView/ServiceStatusStack";
import ProfileStack from "./Views/ProfileViews/ProfileStack";

export default function Main() {
  const Tab = createBottomTabNavigator();
  const pressable = useSelector(enable);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Tab.Screen name="MechanicStack" component={MechanicStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
      <Tab.Screen name="ServiceStatusStack" component={ServiceStatusStack} />
    </Tab.Navigator>
  );
}
