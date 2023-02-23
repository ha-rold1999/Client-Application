import Profile from "./Views/ProfileViews/Profile";
import MechanicStack from "./Views/MechanicViews/MechanicStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

export default function Main() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MechanicStack"
    >
      <Tab.Screen name="MechanicStack" component={MechanicStack} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
