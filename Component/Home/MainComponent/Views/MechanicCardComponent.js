import { View, Text } from "react-native";
import MainView from "../../../../Style/Component/MainViewStyles/StyleMainComponent";

export default function MechanicCard(props) {
  return (
    <View style={MainView.card}>
      <Text style={MainView.nameText}>
        {props.item.accountStatus.Shop.ShopName}
      </Text>
      <Text style={MainView.addressText}>
        {props.item.personalInformation.Address}
      </Text>
    </View>
  );
}
