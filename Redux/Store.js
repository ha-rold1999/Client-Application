import { configureStore } from "@reduxjs/toolkit";
import { fnameSliceReducer } from "./SignupFormReducers/PersonalInfoSlice";
import { licenseSliceReducer } from "./SignupFormReducers/DriveerLicenseFormReducers";
import { credentialSliceReducer } from "./SignupFormReducers/AccountCredFormReducers";
import { loginSliceReducer } from "./LoginFormReducers/LoginReducers";
import { informationSliceReducer } from "./AccountInfoReducers/AccountReducers";
import { mechanicListSliceReducer } from "./MechanicReducers/AvailableMechanicsReducers";
import { requestServiceSliceReducer } from "./RequestReducers/RequestReducer";
import { locationSliceReducer } from "./MapReducers.js/LocationReducer";
import { mechanicLocationSliceReducer } from "./MapReducers/MechanicLocationReducer";
import { requestStatusSliceReucer } from "./MechanicReducers/RequestStatusReducers";

export default configureStore({
  reducer: {
    firstnameSlice: fnameSliceReducer,
    licenseSlice: licenseSliceReducer,
    credentialSlice: credentialSliceReducer,
    loginSlice: loginSliceReducer,
    informationSlice: informationSliceReducer,
    mechanicListSlice: mechanicListSliceReducer,
    requestServiceSlice: requestServiceSliceReducer,
    locationSlice: locationSliceReducer,
    mechanicLocationSlice: mechanicLocationSliceReducer,
    requestStatusSlice: requestStatusSliceReucer,
  },
});
