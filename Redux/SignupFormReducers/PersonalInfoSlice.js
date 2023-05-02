import { createSlice } from "@reduxjs/toolkit";

const firstnameSlice = createSlice({
  name: "firstnameSlice",
  initialState: {
    firstname: "harold",
    lastname: "cuico",
    contact: "09567126397",
    birthdate: "02/20/04",
    address: "Cebu",
    error: "",
    lastnameError: "",
    contactError: "",
    birthdateError: "",
    addressError: "",
    formError: false,
  },
  reducers: {
    handleFirtname: (state, action) => {
      state.firstname = action.payload;
    },
    handleLastname: (state, action) => {
      state.lastname = action.payload;
    },
    handleContact: (state, action) => {
      state.contact = action.payload;
    },
    hadleBirthdate: (state, action) => {
      state.birthdate = action.payload;
    },
    handleAddress: (state, action) => {
      state.address = action.payload;
    },
    checkFirstname: (state, action) => {
      //firstname validation
      if (!state.firstname) {
        state.error = "Enter your firstname";
      } else if (
        !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(state.firstname)
      ) {
        state.error = "Enter a valid firstname";
      } else {
        state.error = "";
      }

      //lastname validation
      if (!state.lastname) {
        state.lastnameError = "Enter your lastname";
      } else if (
        !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(state.lastname)
      ) {
        state.lastnameError = "Enter a valid lastname";
      } else {
        state.lastnameError = "";
      }

      //contact validation
      if (!state.contact) {
        state.contactError = "Enter your contact number";
      } else if (!/^(09|\+639)\d{9}$/.test(state.contact)) {
        state.contactError = "Enter a valid contact number";
      } else {
        state.contactError = "";
      }

      //birthdate validation
      if (!state.birthdate) {
        state.birthdateError = "Enter your birthdate";
      } else if (Date.parse(state.birthdate) >= new Date()) {
        state.birthdateError = "Enter a valid birthdate";
      } else if (
        Math.abs(new Date() - Date.parse(state.birthdate)) / 31557600000 <
        18
      ) {
        state.birthdateError = "Your age is not valid";
      } else {
        state.birthdateError = "";
      }

      //address validation
      if (!state.address) {
        state.addressError = "Enter your address";
      } else if (!/^([a-zA-z0-9/\\''(),-\s]{2,255})$/.test(state.address)) {
        state.addressError = "Enter a valid address";
      } else {
        state.addressError = "";
      }

      //Form validation
      if (
        !state.error &&
        !state.lastnameError &&
        !state.contactError &&
        !state.birthdateError &&
        !state.addressError
      ) {
        state.formError = false;
      } else {
        state.formError = true;
      }
    },
  },
});

export const {
  handleFirtname,
  handleLastname,
  handleContact,
  hadleBirthdate,
  handleAddress,
  checkFirstname,
} = firstnameSlice.actions;
export const firstname = (state) => state.firstnameSlice.firstname;
export const lastname = (state) => state.firstnameSlice.lastname;
export const contact = (state) => state.firstnameSlice.contact;
export const birthdate = (state) => state.firstnameSlice.birthdate;
export const address = (state) => state.firstnameSlice.address;
export const error = (state) => state.firstnameSlice.error;
export const firstnameError = (state) => state.firstnameSlice.firstnameError;
export const lastnameError = (state) => state.firstnameSlice.lastnameError;
export const contactError = (state) => state.firstnameSlice.contactError;
export const birthdateError = (state) => state.firstnameSlice.birthdateError;
export const addressError = (state) => state.firstnameSlice.addressError;
export const formError = (state) => state.firstnameSlice.formError;
export const fnameSliceReducer = firstnameSlice.reducer;
