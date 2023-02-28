import { createNativeStackNavigator } from "@react-navigation/native-stack";
import MechanicList from "./MechanicList";
import MechanicProfile from "./MechanicProfileView";
import RequestService from "./RequestService";

export default function MechanicStack() {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      screenOptions={{ headerShown: false }}
      initialRouteName="MechanicList"
    >
      <Stack.Screen name="MechanicList" component={MechanicList} />
      <Stack.Screen name="MechanicProfile" component={MechanicProfile} />
      <Stack.Screen name="RequestService" component={RequestService} />
    </Stack.Navigator>
  );
}
