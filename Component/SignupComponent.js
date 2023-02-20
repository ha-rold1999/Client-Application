import { View, Text } from "react-native";
import Styles from "../Style/Component/StyleComponent";
import PersonalInformation from "./Signup/PersonalInfoComponent";
import LicenseInfo from "./Signup/LicenseInfoComponent";
import AccountCred from "./Signup/AccountCredComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FormStyle from "../Style/Component/StyleSignupComponent";
import { useDispatch, useSelector } from "react-redux";
import * as PersonalInfo from "../Redux/SignupFormReducers/PersonalInfoSlice";
import * as LicenseInfoForm from "../Redux/SignupFormReducers/DriveerLicenseFormReducers";
import * as CredentialForm from "../Redux/SignupFormReducers/AccountCredFormReducers";

export default function SingupScreen() {
  const checkForm = useDispatch();

  //Peronsal Information Form Validation
  const checkPerosnalInfoForm = useSelector(PersonalInfo.formError);

  //Driverse License Form  Validdation
  const licenseFormError = useSelector(LicenseInfoForm.licenseFormError);

  //Acount Credential Form Validation
  const formError = useSelector(CredentialForm.formError);

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
          {/* Personal Information Component*/}
          <ProgressStep
            label="Personal Information"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            onNext={() => checkForm(PersonalInfo.checkFirstname("error"))}
            errors={checkPerosnalInfoForm}
          >
            <PersonalInformation />
          </ProgressStep>

          {/* Drivers License Component*/}
          <ProgressStep
            label="Dirvers License"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
            onNext={() =>
              checkForm(LicenseInfoForm.checkDriversLicense("error"))
            }
            errors={licenseFormError}
          >
            <LicenseInfo />
          </ProgressStep>

          {/* Username and Password Component*/}
          <ProgressStep
            label="Username and Password"
            nextBtnStyle={FormStyle.submitButton}
            nextBtnTextStyle={FormStyle.submitButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
            onSubmit={() => checkForm(CredentialForm.checkCredForm("error"))}
          >
            <AccountCred />
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Text>Already have an account? Login here</Text>
    </View>
  );
}
