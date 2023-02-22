import { View, Pressable, Text, Image } from "react-native";
import modelStyle from "../../../../Style/Component/Modal/StyleModelComponent";

export default function UsernameError(props) {
  return (
    <>
      <View style={modelStyle.activity}>
        <Image
          source={require("../../../../assets/Icons/error.png")}
          style={modelStyle.icon}
        />
        <Text style={modelStyle.activityText}>Username does not exist</Text>
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
