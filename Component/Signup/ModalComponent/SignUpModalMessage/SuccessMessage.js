import { View, Pressable, Text, Image } from "react-native";
import modelStyle from "../../../../Style/Component/Modal/StyleModelComponent";

export default function Success(props) {
  return (
    <>
      <View style={modelStyle.activity}>
        <Image
          source={require("../../../../assets/Icons/success.png")}
          style={modelStyle.icon}
        />
        <Text style={modelStyle.activityText}>Success Welcome to AYUS</Text>
      </View>
      <Pressable
        style={modelStyle.button}
        onPress={() => {
          props.setModalVisible(!props.modalVisible);
          props.navigation.navigate("Login");
        }}
      >
        <Text style={modelStyle.textSucces}>OK</Text>
      </Pressable>
    </>
  );
}
