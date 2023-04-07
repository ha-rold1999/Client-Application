import MechanicStack from "./Views/MechanicViews/MechanicStack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import ServiceStatusStack from "./Views/ServiceView/ServiceStatusStack";
import ProfileStack from "./Views/ProfileViews/ProfileStack";
import { View, Image } from "react-native";

export default function Main() {
  const Tab = createBottomTabNavigator();
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="Profile"
    >
      <Tab.Screen
        name="Mechanic"
        component={MechanicStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/mechanicIcon.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/person.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        }}
      />
      <Tab.Screen
        name="Service"
        component={ServiceStatusStack}
        options={{
          tabBarIcon: ({ focused }) => (
            <View>
              <Image
                source={require("../../../assets/Icons/fixing.png")}
                resizeMode="contain"
                style={{ width: 30, height: 30 }}
              />
            </View>
          ),
        }}
      />
    </Tab.Navigator>
  );
}
