import { createSlice } from "@reduxjs/toolkit";

const firstnameSlice = createSlice({
  name: "firstnameSlice",
  initialState: {
    firstname: "",
    lastname: "",
    contact: "",
    birthdate: "",
    address: "",
    error: "",
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
    checkFirstname: (state) => {
      if (!state.firstname) {
        state.error = "Enter your firstname";
      } else if (
        !/^(?=.{1,50}$)[a-z]+(?:['_.\s][a-z]+)*$/i.test(state.firstname)
      ) {
        state.error = "Enter a valid firstname";
      } else {
        state.error = "";
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
export const fnameSliceReducer = firstnameSlice.reducer;
