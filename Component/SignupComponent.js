import {
  View,
  Text,
  Modal,
  StyleSheet,
  Pressable,
  ActivityIndicator,
} from "react-native";
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
import { useState } from "react";
import SingnupConfirmation from "./Signup/ModalComponent/SignupConfirmationModal";

export default function SingupScreen({ navigation }) {
  const apiKey = "API_SECRET-42e016b219421dc83d180bdee27f81dd";

  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const firstname = useSelector(PersonalInfo.firstname);
  const lastname = useSelector(PersonalInfo.lastname);
  const contact = useSelector(PersonalInfo.contact);
  const birthdate = useSelector(PersonalInfo.birthdate);
  const address = useSelector(PersonalInfo.address);
  const licenseNo = useSelector(LicenseInfoForm.licenseNo);
  const expiryDate = useSelector(LicenseInfoForm.licenseExpDate);
  const email = useSelector(CredentialForm.email);
  const username = useSelector(CredentialForm.username);
  const password = useSelector(CredentialForm.password);

  const checkForm = useDispatch();

  //Peronsal Information Form Validation
  const checkPerosnalInfoForm = useSelector(PersonalInfo.formError);

  //Driverse License Form  Validdation
  const licenseFormError = useSelector(LicenseInfoForm.licenseFormError);

  //Acount Credential Form Validation
  const formError = useSelector(CredentialForm.formError);

  const executePost = () => {
    checkForm(CredentialForm.checkCredForm("error"));
    if (!formError) {
      console.log("fetch");
      setModalVisible(true);
      fetch("http://203.177.71.218:5003/api/Account", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          personalInformation: {
            Firstname: firstname,
            Lastname: lastname,
            Contact: contact,
            Birthdate: new Date(Date.parse(birthdate)),
            Address: address,
            LicenseNumber: licenseNo,
            Expiry: new Date(Date.parse(expiryDate)),
          },
          credential: {
            Username: username,
            Password: password,
            Email: email,
          },
          wallet: {
            Balance: 0,
            Pincode: "",
          },
          accountStatus: {
            Shop: null,
            Role: "CLIENT",
          },
        }),
      })
        .then((res) => res.json())
        .then((response) => {
          if (response.Status == 409) {
            setIsError(true);
            setIsSuccess(false);
          } else {
            setIsError(false);
            setIsSuccess(true);
          }
          setIsLoading(false);
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <View style={Styles.container}>
      <Text style={{ fontSize: 20 }}>Create Your Account</Text>
      <SingnupConfirmation
        modalVisible={modalVisible}
        isLoading={isLoading}
        isError={isError}
        isSuccess={isSuccess}
        setModalVisible={setModalVisible}
        navigation={navigation}
      />
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
            onSubmit={executePost}
          >
            <AccountCred />
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Text>Already have an account? Login here</Text>
    </View>
  );
}
