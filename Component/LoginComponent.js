import { View, Text, Image, TextInput, Pressable } from "react-native";
import Checkbox from "expo-checkbox";
import { LinearGradient } from "expo-linear-gradient";
import Styles from "../Style/Component/StyleComponent";
import LoginForm from "../Style/Component/StyleLoginComponent";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import * as loginForm from "../Redux/LoginFormReducers/LoginReducers";
import LoginModal from "./Signup/ModalComponent/LoginModal";
import { getAllData } from "../Redux/AccountInfoReducers/AccountReducers";
import { server, apiKey } from "../Static";

export default function LoginScreen({ navigation }) {
  const dispatch = useDispatch();

  const username = useSelector(loginForm.username);
  const password = useSelector(loginForm.password);
  const usernameError = useSelector(loginForm.usernameError);
  const passwordError = useSelector(loginForm.passwordError);
  const formError = useSelector(loginForm.formError);

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isExist, setIsExist] = useState(false);
  const [isPasswordWrong, setIsPasswordWrong] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const loginFetch = () => {
    dispatch(loginForm.checkLoginForm("error"));
    if (!formError) {
      setModalVisible(true);
      fetch(`${server}/api/Account`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
          username: username,
          password: password,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.Status == 404) {
            setIsExist(true);
            setIsPasswordWrong(false);
            setIsSuccess(false);
          } else if (data.Status == 401) {
            setIsExist(false);
            setIsPasswordWrong(true);
            setIsSuccess(false);
          } else {
            setIsExist(false);
            setIsPasswordWrong(false);
            setIsSuccess(true);
            dispatch(getAllData(data));
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log("error: " + error);
          setIsLoading(false);
        });
    }
  };

  const [isChecked, setChecked] = useState(false);
  return (
    <LinearGradient
      style={Styles.container}
      colors={["#cff5fb", "#fcfdfd"]}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }}
    >
      <LoginModal
        modalVisible={modalVisible}
        isExist={isExist}
        isPasswordWrong={isPasswordWrong}
        isLoading={isLoading}
        isSuccess={isSuccess}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
      {/* Logo */}
      <View style={LoginForm.img}>
        <Image
          source={require("../assets/Logo/Logo.png")}
          style={{ width: 200, height: 100 }}
        />
      </View>

      <View style={LoginForm.form}>
        {/* Username */}
        <View style={LoginForm.inputView}>
          <Text style={LoginForm.label}>Username</Text>
          <TextInput
            onFocus={() => dispatch(loginForm.handleUsername(""))}
            style={LoginForm.input}
            onChangeText={(text) => dispatch(loginForm.handleUsername(text))}
          />
          {usernameError && (
            <Text style={{ color: "red" }}>{usernameError}</Text>
          )}
        </View>

        {/* Password */}
        <View style={LoginForm.inputView}>
          <Text style={LoginForm.label}>Password</Text>
          <TextInput
            style={LoginForm.input}
            secureTextEntry
            onChangeText={(text) =>
              dispatch(loginForm.handlePassword("ThisIsATest@123"))
            }
            value="ThisIsATest@123"
          />
          {passwordError && (
            <Text style={{ color: "red" }}>{passwordError}</Text>
          )}
        </View>

        {/* Checkbox */}
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

        {/* Login Button */}
        <Pressable style={LoginForm.loginButton} onPress={loginFetch}>
          <Text style={LoginForm.loginText}>Login</Text>
        </Pressable>
      </View>
    </LinearGradient>
  );
}
