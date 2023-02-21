import { View, Text, ActivityIndicator } from "react-native";
import modelStyle from "../../../Style/Component/Modal/StyleModelComponent";

export default function Loading() {
  return (
    <View style={modelStyle.activity}>
      <ActivityIndicator size={"large"} />
      <Text style={modelStyle.activityText}>Loading</Text>
    </View>
  );
}
