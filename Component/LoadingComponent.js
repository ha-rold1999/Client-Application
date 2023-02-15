import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Style/Component/StyleComponent";
import { Image, ActivityIndicator } from "react-native";

export default function LaodingScreen() {
  return (
    <LinearGradient
      colors={["skyblue", "white"]}
      style={Styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <Image source={require("../assets/Logo/Logo.png")} />
      <ActivityIndicator size={"large"} />
    </LinearGradient>
  );
}
