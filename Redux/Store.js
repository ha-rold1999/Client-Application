import { configureStore } from "@reduxjs/toolkit";
import { fnameSliceReducer } from "./SignupFormReducers/PersonalInfoSlice";

export default configureStore({
  reducer: { firstnameSlice: fnameSliceReducer },
});
