import { Image, View, Pressable, Text } from "react-native";
import Styles from "../Style/Component/StyleComponent";
import { LinearGradient } from "expo-linear-gradient";

export default function SignUpScreen() {
  return (
    <LinearGradient
      colors={["#cff5fb", "#fcfdfd"]}
      style={Styles.container}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View>
        <Image source={require("../assets/Logo/Logo.png")} />
        <Pressable style={Styles.buttton}>
          <Text style={Styles.buttonText}>Login</Text>
        </Pressable>
        <Pressable style={Styles.buttton}>
          <Text style={Styles.buttonText}>Sign Up</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
