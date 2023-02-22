import { useEffect } from "react";
import { View, Pressable, Text, Image } from "react-native";
import modelStyle from "../../../../Style/Component/Modal/StyleModelComponent";

export default function Success(props) {
  useEffect(() => {
    const timer = setTimeout(() => {
      props.setModalVisible(false);
    }, 1000);
    return () => {
      clearTimeout(timer);
    };
  }, []);
  return (
    <>
      <View style={modelStyle.activity}>
        <Image
          source={require("../../../../assets/Icons/success.png")}
          style={modelStyle.icon}
        />
        <Text style={modelStyle.activityText}>Success! Welcome to AYUS</Text>
      </View>
    </>
  );
}
