import { View, Pressable, Text, Image } from "react-native";
import modelStyle from "../../../../Style/Component/Modal/StyleModelComponent";

export default function PasswordError(props) {
  return (
    <>
      <View style={modelStyle.activity}>
        <Image
          source={require("../../../../assets/Icons/warning.png")}
          style={modelStyle.icon}
        />
        <Text style={modelStyle.activityText}>
          Incorect password does not exist
        </Text>
      </View>
      <Pressable
        style={modelStyle.button}
        onPress={() => {
          props.setModalVisible(!props.modalVisible);
        }}
      >
        <Text style={modelStyle.textFail}>Close</Text>
      </Pressable>
    </>
  );
}
