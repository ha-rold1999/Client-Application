import { View, Text, Image, TextInput, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Style/Component/StyleComponent";
import LoginForm from "../Style/Component/StyleLoginComponent";
import { useState } from "react";

export default function LoginScreen() {
  const [isChecked, setChecked] = useState(false);
  return (
    <LinearGradient
      style={Styles.container}
      colors={["#cff5fb", "#fcfdfd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <View style={LoginForm.img}>
        <Image
          source={require("../assets/Logo/Logo.png")}
          style={{ width: 200, height: 100 }}
        />
      </View>
      <View style={LoginForm.form}>
        <Text style={LoginForm.label}>Username</Text>
        <TextInput style={LoginForm.input} />
        <Text style={LoginForm.label}>Password</Text>
        <TextInput style={LoginForm.input} secureTextEntry />
        <View style={LoginForm.checkBox}>
          <Checkbox
            value={isChecked}
            onValueChange={setChecked}
            color={isChecked ? "black" : undefined}
          />
          <Pressable
            onPress={() => {
              isChecked ? setChecked(false) : setChecked(true);
            }}
          >
            <Text style={{ marginLeft: 5 }}>Remember Me?</Text>
          </Pressable>
          <Text
            style={{
              marginRight: 0,
              marginLeft: 87,
              color: "#61aee1",
            }}
          >
            Forget Password?
          </Text>
        </View>
        <Pressable style={LoginForm.loginButton}>
          <Text style={LoginForm.loginText}>Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
