import { View, Text, TextInput, Pressable, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import Checkbox from "expo-checkbox";
import { useSelector, useDispatch } from "react-redux";
import * as CredForm from "../../Redux/SignupFormReducers/AccountCredFormReducers";

export default function AccountCred() {
  const email = useSelector(CredForm.email);
  const username = useSelector(CredForm.username);
  const password = useSelector(CredForm.password);
  const retypePass = useSelector(CredForm.retypePass);
  const aggree = useSelector(CredForm.aggree);

  const emailError = useSelector(CredForm.emailError);
  const usernameError = useSelector(CredForm.usernameError);
  const passwordError = useSelector(CredForm.passwordError);
  const retypePassError = useSelector(CredForm.retypePassError);
  const aggreError = useSelector(CredForm.aggreError);
  const dispatch = useDispatch();
  return (
    <>
      {/*Email Input*/}
      <Text style={FormStyle.label}>Email</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/email.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(CredForm.handleEmmail(text))}
          value={email}
        />
      </View>
      {emailError && <Text style={{ color: "red" }}>{emailError}</Text>}

      {/*Username Input*/}
      <Text style={FormStyle.label}>Username</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/username.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(CredForm.handleUsername(text))}
          value={username}
        />
      </View>
      {usernameError && <Text style={{ color: "red" }}>{usernameError}</Text>}

      {/*Password Input*/}
      <Text style={FormStyle.label}>Password</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/password.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(CredForm.handlePassword(text))}
          value={password}
          secureTextEntry
        />
      </View>
      {passwordError && <Text style={{ color: "red" }}>{passwordError}</Text>}

      {/*Password Confirmation Input*/}
      <Text style={FormStyle.label}>Re-type Password</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/password.png")}
          style={{ width: 30, height: 30, marginRight: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) => dispatch(CredForm.handleRetypePass(text))}
          value={retypePass}
          secureTextEntry
        />
      </View>
      {retypePassError && (
        <Text style={{ color: "red" }}>{retypePassError}</Text>
      )}

      {/*Terms and Conditions*/}
      <View style={{ flexDirection: "row", paddingTop: 10 }}>
        <Checkbox
          value={aggree}
          onValueChange={() => dispatch(CredForm.handleAggree(!aggree))}
          color={aggree ? "black" : undefined}
        />
        <Pressable
          onPress={() => {
            dispatch(CredForm.handleAggree(!aggree));
          }}
        >
          <Text style={{ paddingLeft: 5 }}>
            You Agree with the Terms and Service of AYUS
          </Text>
        </Pressable>
      </View>
      {aggreError && <Text style={{ color: "red" }}>{aggreError}</Text>}
    </>
  );
}
