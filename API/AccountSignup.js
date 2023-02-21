import { useSelector } from "react-redux";
import * as PersonalInfoData from "../Redux/SignupFormReducers/PersonalInfoSlice";
import * as DriverLicenseData from "../Redux/SignupFormReducers/DriveerLicenseFormReducers";
import * as AccountCred from "../Redux/SignupFormReducers/AccountCredFormReducers";

export function PostAccountCred() {
  console.log("PostAccout");
  const apiKey = "API_SECRET-42e016b219421dc83d180bdee27f81dd";

  const firstname = useSelector(PersonalInfoData.firstname);

  const lastname = useSelector(PersonalInfoData.lastname);
  const contact = useSelector(PersonalInfoData.contact);
  const birthdate = useSelector(PersonalInfoData.birthdate);
  const address = useSelector(PersonalInfoData.address);
  const licenseNo = useSelector(DriverLicenseData.licenseNo);
  const expiryDate = useSelector(DriverLicenseData.licenseExpDate);
  const email = useSelector(AccountCred.email);
  const username = useSelector(AccountCred.username);
  const password = useSelector(AccountCred.password);

  console.log(
    "Log this:" +
      JSON.stringify({
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
      })
  );
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
      console.log(response);
      if (response.status == 409) console.log("Conflict");
    })
    .catch((error) => console.log(error));
}
