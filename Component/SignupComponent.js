import { View, Text, TextInput, Pressable } from "react-native";
import Styles from "../Style/Component/StyleComponent";
import PersonalInformation from "./Signup/PersonalInfoComponent";
import LicenseInfo from "./Signup/LicenseInfoComponent";
import AccountCred from "./Signup/AccountCredComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FormStyle from "../Style/Component/StyleSignupComponent";
import { useState } from "react";

export default function SingupScreen() {
  const [firstname, setFirstname] = useState("Harold");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastName] = useState("Cuico");
  const [lastnameError, setLastnameError] = useState("");
  const [contact, setContact] = useState("09567126387");
  const [contactError, setContactError] = useState("");
  const [birthdate, setBirthdate] = useState("02/19/23");
  const [birthdateError, setBirthdateError] = useState("");
  const [address, setAddress] = useState("Cebu City, Cebu");
  const [addressError, setAddressError] = useState("");
  const [licenseNo, setLicenseNo] = useState("");
  const [licenseNoError, setLicenseNoError] = useState("");
  const [licenseExpDate, setExpDate] = useState("");
  const [licenseExpDateError, setExpDateError] = useState("");
  const [isError, setError] = useState(false);

  const checkPersonalInfoForm = () => {
    if (!firstname || !lastname || !contact || !birthdate || !address) {
      if (!firstname) {
        setFirstnameError("Enter your firstname");
      } else {
        setFirstnameError("");
      }
      if (!lastname) {
        setLastnameError("Enter your lastname");
      } else {
        setLastnameError("");
      }
      if (!contact) {
        setContactError("Enter your mobile number");
      } else {
        setContactError("");
      }
      if (!birthdate) {
        setBirthdateError("Enter your birthdate");
      } else {
        setBirthdateError("");
      }
      if (!address) {
        setAddressError("Enter your address");
      } else {
        setAddressError("");
      }
      setError(true);
    } else if (
      !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(firstname) ||
      !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(lastname) ||
      !/^(09|\+639)\d{9}$/.test(contact) ||
      !/^([a-zA-z0-9/\\''(),-\s]{2,255})$/.test(address)
    ) {
      if (!/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(firstname)) {
        setFirstnameError("Enter a valid firstname");
      } else {
        setFirstnameError("");
      }
      if (!/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(lastname)) {
        setLastnameError("Enter a valid lastname");
      } else {
        setLastnameError("");
      }
      if (!/^(09|\+639)\d{9}$/.test(contact)) {
        setContactError("Enter a valid contact number");
      } else {
        setContactError("");
      }
      if (!/^([a-zA-z0-9/\\''(),-\s]{2,255})$/.test(address)) {
        setAddressError("Enter a valid address");
      } else {
        setAddressError("");
      }
      setError(true);
    } else {
      setError(false);
      setFirstnameError("");
      setLastnameError("");
      setContactError("");
      setBirthdateError("");
      setAddressError("");
    }
  };
  const checkDriverLicenseForm = () => {
    if (!licenseNo || !licenseExpDate) {
      if (!licenseNo) {
        setLicenseNoError("Enter your license no.");
      } else {
        setLicenseNoError("");
      }
      if (!licenseExpDate) {
        setExpDateError("Enter your license expiration date");
      } else {
        setExpDateError("");
      }
      setError(true);
    } else if (!/^[A-Z]\d{2}-\d{2}-\d{6}$/.test(licenseNo)) {
      if (!/^[A-Z]\d{2}-\d{2}-\d{6}$/.test(licenseNo)) {
        setLicenseNoError("Enter a valid license no");
      } else {
        setLicenseNoError("");
      }
      setError(true);
    } else {
      setError(false);
      setLicenseNoError("");
      setExpDateError("");
    }
  };

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
            onNext={checkPersonalInfoForm}
            errors={isError}
          >
            <PersonalInformation
              firstname={firstname}
              setFirstname={setFirstname}
              firstnameError={firstnameError}
              lastnameError={lastnameError}
              lastname={lastname}
              setLastName={setLastName}
              contact={contact}
              setContact={setContact}
              contactError={contactError}
              birthdate={birthdate}
              setBirthdate={setBirthdate}
              birthdateError={birthdateError}
              address={address}
              setAddress={setAddress}
              addressError={addressError}
            />
          </ProgressStep>

          {/* Drivers License Component*/}
          <ProgressStep
            label="Dirvers License"
            nextBtnStyle={FormStyle.nextButton}
            nextBtnTextStyle={FormStyle.nextButton}
            previousBtnStyle={FormStyle.prevButton}
            previousBtnTextStyle={FormStyle.prevButton}
            onNext={checkDriverLicenseForm}
            errors={isError}
          >
            <LicenseInfo
              licenseNo={licenseNo}
              setLicenseNo={setLicenseNo}
              licenseNoError={licenseNoError}
              licenseExpDate={licenseExpDate}
              setExpDate={setExpDate}
              licenseExpDateError={licenseExpDateError}
            />
          </ProgressStep>

          {/* Username and Password Component*/}
          <ProgressStep
            label="Username and Password"
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
