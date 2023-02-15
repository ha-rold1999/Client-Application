import { View, Text, TextInput, Pressable } from "react-native";
import Styles from "../Style/Component/StyleComponent";
import FormStyle from "../Style/Component/StyleSignupComponent";

export default function SingupScreen() {
  return (
    <View style={Styles.container}>
      <View style={FormStyle.form}>
        <Text style={{ fontSize: 20 }}>Create Your Account</Text>
        <View>
          <Text style={FormStyle.label}>Firstname</Text>
          <TextInput style={FormStyle.input} />
          <Text style={FormStyle.label}>Lastname</Text>
          <TextInput style={FormStyle.input} />
          <Text style={FormStyle.label}>Contact</Text>
          <TextInput keyboardType="number-pad" style={FormStyle.input} />
          <Text style={FormStyle.label}>Birthdate</Text>
          <TextInput style={FormStyle.input} />
          <Text style={FormStyle.label}>Address</Text>
          <TextInput style={FormStyle.input} />
          <Pressable style={FormStyle.button}>
            <Text style={FormStyle.buttonText}>Next</Text>
          </Pressable>
          <Text style={FormStyle.sideNote}>
            Already have an account? Login here
          </Text>
        </View>
      </View>
    </View>
  );
}
