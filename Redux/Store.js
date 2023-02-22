import { configureStore } from "@reduxjs/toolkit";
import { fnameSliceReducer } from "./SignupFormReducers/PersonalInfoSlice";
import { licenseSliceReducer } from "./SignupFormReducers/DriveerLicenseFormReducers";
import { credentialSliceReducer } from "./SignupFormReducers/AccountCredFormReducers";
import { loginSliceReducer } from "./LoginFormReducers/LoginReducers";
import { informationSliceReducer } from "./AccountInfoReducers/AccountReducers";

export default configureStore({
  reducer: {
    firstnameSlice: fnameSliceReducer,
    licenseSlice: licenseSliceReducer,
    credentialSlice: credentialSliceReducer,
    loginSlice: loginSliceReducer,
    informationSlice: informationSliceReducer,
  },
});
