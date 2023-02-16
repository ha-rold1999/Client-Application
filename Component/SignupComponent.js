import { View, Text, TextInput, Pressable } from "react-native";
import Styles from "../Style/Component/StyleComponent";
import PersonalInformation from "./Signup/PersonalInfoComponent";
import LicenseInfo from "./Signup/LicenseInfoComponent";
import AccountCred from "./Signup/AccountCredComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FormStyle from "../Style/Component/StyleSignupComponent";

export default function SingupScreen() {
  return (
    <View style={Styles.container}>
      <Text style={{ fontSize: 20 }}>Create Your Account</Text>
      <View style={FormStyle.steps}>
        <ProgressSteps
          activeStepIconBorderColor="#61afe1"
          activeLabelColor="#61afe1"
          completedStepIconColor="#d1f6fb"
          completedProgressBarColor="#d1f6fb"
          completedCheckColor="#61afe1"
        >
          <ProgressStep
            label="Personal Information"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
          >
            <PersonalInformation />
          </ProgressStep>
          <ProgressStep
            label="Dirvers License"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
          >
            <LicenseInfo />
          </ProgressStep>
          <ProgressStep
            label="Email and Password"
            nextBtnStyle={FormStyle.submitButton}
            nextBtnTextStyle={FormStyle.submitButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
          >
            <AccountCred />
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Text>Already have an account? Login here</Text>
    </View>
  );
}
