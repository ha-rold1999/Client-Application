import { View, Text } from "react-native";

export default function MechanicProfile({ route }) {
  const ShopData = route.params;
  return (
    <View>
      <Text>{ShopData.ShopData.accountStatus.Shop.ShopName}</Text>
    </View>
  );
}
