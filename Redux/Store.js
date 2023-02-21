import { configureStore } from "@reduxjs/toolkit";
import { fnameSliceReducer } from "./SignupFormReducers/PersonalInfoSlice";
import { licenseSliceReducer } from "./SignupFormReducers/DriveerLicenseFormReducers";
import { credentialSliceReducer } from "./SignupFormReducers/AccountCredFormReducers";

export default configureStore({
  reducer: {
    firstnameSlice: fnameSliceReducer,
    licenseSlice: licenseSliceReducer,
    credentialSlice: credentialSliceReducer,
  },
});
