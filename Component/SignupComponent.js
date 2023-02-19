import { View, Text, TextInput, Pressable } from "react-native";
import Styles from "../Style/Component/StyleComponent";
import PersonalInformation from "./Signup/PersonalInfoComponent";
import LicenseInfo from "./Signup/LicenseInfoComponent";
import AccountCred from "./Signup/AccountCredComponent";
import { ProgressSteps, ProgressStep } from "react-native-progress-steps";
import FormStyle from "../Style/Component/StyleSignupComponent";
import { useState } from "react";

export default function SingupScreen() {
  //Peronsal Information Form Validation
  const [firstname, setFirstname] = useState("");
  const [firstnameError, setFirstnameError] = useState("");
  const [lastname, setLastName] = useState("");
  const [lastnameError, setLastnameError] = useState("");
  const [contact, setContact] = useState("");
  const [contactError, setContactError] = useState("");
  const [birthdate, setBirthdate] = useState("");
  const [birthdateError, setBirthdateError] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");

  //Driverse License Form  Validdation
  const [licenseNo, setLicenseNo] = useState("");
  const [licenseNoError, setLicenseNoError] = useState("");
  const [licenseExpDate, setExpDate] = useState("");
  const [licenseExpDateError, setExpDateError] = useState("");

  //Acount Credential Form Validation
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [username, setUsername] = useState("");
  const [usernameError, setUsernameError] = useState("");
  const [password, setPassword] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [passwordConfirmationError, setPasswordConfirmationError] =
    useState("");
  const [isChecked, setChecked] = useState(false);
  const [isCheckedError, setCheckedError] = useState("");

  //Form Error flag
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
  const checkAccountCredForm = () => {
    if (
      !email ||
      !username ||
      !password ||
      !passwordConfirmation ||
      !isChecked
    ) {
      if (!email) {
        setEmailError("Enter your email");
      } else {
        setEmailError("");
      }
      if (!username) {
        setUsernameError("Enter your username");
      } else {
        setUsernameError("");
      }
      if (!password) {
        setPasswordError("Enter your password");
      } else {
        setPasswordError("");
      }
      if (!passwordConfirmation) {
        setPasswordConfirmationError("Re enter your password");
      } else {
        setPasswordConfirmationError("");
      }
      if (!isChecked) {
        setCheckedError("This confirmation is required");
      } else {
        setCheckedError("");
      }
      setError(true);
    } else if (
      !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
        email
      ) ||
      !/^[A-Za-z][A-Za-z0-9_]{2,29}$/.test(username) ||
      !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]{8,}$/.test(
        password
      )
    ) {
      if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          email
        )
      ) {
        setEmailError("Enter a valid email address");
      } else {
        setEmailError("");
      }
      if (!/^[A-Za-z][A-Za-z0-9_]{2,29}$/.test(username)) {
        setUsernameError("Enter a valid usernname");
      } else {
        setUsernameError("");
      }
      if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]{8,}$/.test(
          password
        )
      ) {
        setPasswordError(
          "Password must be at leat 8 character with at least one uppercase letter, one lowercase letter, one number and one special character"
        );
      } else {
        setPasswordError("");
      }

      console.log(password);
      setCheckedError("");
      setError(true);
    } else if (password !== passwordConfirmation) {
      setPasswordConfirmationError("Password does not match");
      setError(true);
    } else {
      setError(false);
      setEmailError("");
      setUsernameError("");
      setPasswordError("");
      setPasswordConfirmationError("");
      setCheckedError("");
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
            onSubmit={checkAccountCredForm}
          >
            <AccountCred
              email={email}
              setEmail={setEmail}
              emailError={emailError}
              username={username}
              setUsername={setUsername}
              usernameError={usernameError}
              password={password}
              setPassword={setPassword}
              passwordError={passwordError}
              passwordConfirmation={passwordConfirmation}
              setPasswordConfirmation={setPasswordConfirmation}
              passwordConfirmationError={passwordConfirmationError}
              isChecked={isChecked}
              setChecked={setChecked}
              isCheckedError={isCheckedError}
            />
          </ProgressStep>
        </ProgressSteps>
      </View>
      <Text>Already have an account? Login here</Text>
    </View>
  );
}
