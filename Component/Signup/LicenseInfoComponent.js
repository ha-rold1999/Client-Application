import { View, Text, TextInput, Image } from "react-native";
import FormStyle from "../../Style/Component/StyleSignupComponent";
import DatePicker from "../FormCoponent/DatePickerComponent";
import { useSelector, useDispatch } from "react-redux";
import * as LicenseInfoForm from "../../Redux/SignupFormReducers/DriveerLicenseFormReducers";

export default function LicenseInfo(props) {
  const licenseNo = useSelector(LicenseInfoForm.licenseNo);
  const licenseExpDate = useSelector(LicenseInfoForm.licenseExpDate);

  const licenseNoError = useSelector(LicenseInfoForm.licenseNoError);
  const licenseExpDateError = useSelector(LicenseInfoForm.licenseExpDateError);
  const dispatch = useDispatch();
  return (
    <>
      <Text style={FormStyle.label}>License No</Text>
      <View style={FormStyle.textInputView}>
        <Image
          source={require("../../assets/Icons/license.png")}
          style={{ width: 30, height: 30, marginHorizontal: 5 }}
        />
        <TextInput
          style={FormStyle.input}
          onChangeText={(text) =>
            dispatch(LicenseInfoForm.handleLicenseNo(text))
          }
          value={licenseNo}
        />
      </View>
      {licenseNoError && <Text style={{ color: "red" }}>{licenseNoError}</Text>}

      <Text style={FormStyle.label}>Expiry Date</Text>
      <DatePicker
        birthdate={licenseExpDate}
        setBirthdate={(text) =>
          dispatch(LicenseInfoForm.handleLicenseExpDate(text))
        }
      />
      {licenseExpDateError && (
        <Text style={{ color: "red" }}>{licenseExpDateError}</Text>
      )}
    </>
  );
}
