import MechanicStack from "./Views/MechanicViews/MechanicStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceStatusStack from "./Views/ServiceView/ServiceStatusStack";
import ProfileStack from "./Views/ProfileViews/ProfileStack";

export default function Main() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="ProfileStack"
    >
      <Tab.Screen name="MechanicStack" component={MechanicStack} />
      <Tab.Screen name="ProfileStack" component={ProfileStack} />
      <Tab.Screen name="ServiceStatusStack" component={ServiceStatusStack} />
    </Tab.Navigator>
  );
}
