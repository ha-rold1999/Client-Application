import Profile from "./Views/ProfileViews/Profile";
import MechanicStack from "./Views/MechanicViews/MechanicStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { enable } from "../../../Redux/MechanicReducers/AvailableMechanicsReducers";
import { useSelector } from "react-redux";
import ServiceStatus from "./Views/ServiceView/ServiceStatus";

export default function Main() {
  const Tab = createBottomTabNavigator();
  const pressable = useSelector(enable);
  console.log(pressable);
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Tab.Screen name="MechanicStack" component={MechanicStack} />
      <Tab.Screen name="Profile" component={Profile} />
      <Tab.Screen name="ServiceStatus" component={ServiceStatus} />
    </Tab.Navigator>
  );
}
