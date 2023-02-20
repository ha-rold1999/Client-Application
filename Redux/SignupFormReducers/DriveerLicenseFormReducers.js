import { createSlice } from "@reduxjs/toolkit";

const licenseSlice = createSlice({
  name: "licenseSlice",
  initialState: {
    licenseNo: "G11-11-123456",
    licenseExpDate: "02/20/23",
    licenseNoError: "",
    licenseExpDateError: "",
    licenseFormError: false,
  },
  reducers: {
    handleLicenseNo: (state, action) => {
      state.licenseNo = action.payload;
    },
    handleLicenseExpDate: (state, action) => {
      state.licenseExpDate = action.payload;
    },
    checkDriversLicense: (state, action) => {
      //Lincense No Validation
      if (!state.licenseNo) {
        state.licenseNoError = "Enter your license no";
      } else if (!/^[A-Z]\d{2}-\d{2}-\d{6}$/.test(state.licenseNo)) {
        state.licenseNoError = "Enter a a valid license no";
      } else {
        state.licenseNoError = "";
      }

      // Lincense Expiration Date Validation
      if (!state.licenseExpDate) {
        state.licenseExpDateError = "Enter you license expiration date";
      } else {
        state.licenseExpDateError = "";
      }

      //Form Validation
      if (!state.licenseNoError && !state.licenseExpDateError) {
        state.licenseFormError = false;
      } else {
        state.licenseFormError = true;
      }
    },
  },
});

export const { handleLicenseNo, handleLicenseExpDate, checkDriversLicense } =
  licenseSlice.actions;
export const licenseNo = (state) => state.licenseSlice.licenseNo;
export const licenseExpDate = (state) => state.licenseSlice.licenseExpDate;
export const licenseNoError = (state) => state.licenseSlice.licenseNoError;
export const licenseExpDateError = (state) =>
  state.licenseSlice.licenseExpDateError;
export const licenseFormError = (state) => state.licenseSlice.licenseFormError;
export const licenseSliceReducer = licenseSlice.reducer;
