import { createSlice } from "@reduxjs/toolkit";

const credentialSlice = createSlice({
  name: "credentialSlice",
  initialState: {
    email: "",
    username: "",
    password: "",
    retypePass: "",
    aggree: false,
    emailError: "",
    usernameError: "",
    passwordError: "",
    retypePassError: "",
    aggreError: "",
    formError: false,
  },
  reducers: {
    handleEmmail: (state, action) => {
      state.email = action.payload;
    },
    handleUsername: (state, action) => {
      state.username = action.payload;
    },
    handlePassword: (state, action) => {
      state.password = action.payload;
    },
    handleRetypePass: (state, action) => {
      state.retypePass = action.payload;
    },
    handleAggree: (state, action) => {
      state.aggree = action.payload;
    },
    checkCredForm: (state, action) => {
      if (!state.email) {
        state.emailError = "Enter your email";
      } else if (
        !/^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(
          state.email
        )
      ) {
        state.emailError = "Enter a valid email address";
      } else {
        state.emailError = "";
      }

      if (!state.username) {
        state.usernameError = "Enter your username";
      } else if (!/^[A-Za-z][A-Za-z0-9_]{2,29}$/.test(state.username)) {
        state.usernameError = "Enter a valid username";
      } else {
        state.usernameError = "";
      }

      if (!state.password) {
        state.passwordError = "Enter your password";
      } else if (
        !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*-?&])[A-Za-z\d@$!%*-?&]{8,}$/.test(
          state.password
        )
      ) {
        state.passwordError =
          "Password must be at leat 8 character with at least one uppercase letter, one lowercase letter, one number and one special character";
      } else {
        state.passwordError = "";
      }

      if (!state.retypePass) {
        state.retypePassError = "Re-type your password";
      } else if (state.password !== state.retypePass) {
        state.retypePassError = "Your password does not match";
      } else {
        state.retypePassError = "";
      }

      if (!state.aggree) {
        state.aggreError = "This confirmation is required";
      } else {
        state.aggreError = "";
      }

      if (
        !state.emailError &&
        !state.usernameError &&
        !state.passwordError &&
        !state.retypePassError &&
        !state.aggreError
      ) {
        state.formError = false;
      } else {
        state.formError = true;
      }
    },
  },
});

export const {
  handleEmmail,
  handleUsername,
  handlePassword,
  handleRetypePass,
  handleAggree,
  checkCredForm,
} = credentialSlice.actions;
export const email = (state) => state.credentialSlice.email;
export const username = (state) => state.credentialSlice.username;
export const password = (state) => state.credentialSlice.password;
export const retypePass = (state) => state.credentialSlice.retypePass;
export const aggree = (state) => state.credentialSlice.aggree;

export const emailError = (state) => state.credentialSlice.emailError;
export const usernameError = (state) => state.credentialSlice.usernameError;
export const passwordError = (state) => state.credentialSlice.passwordError;
export const retypePassError = (state) => state.credentialSlice.retypePassError;
export const aggreError = (state) => state.credentialSlice.aggreError;

export const formError = (state) => state.credentialSlice.formError;
export const credentialSliceReducer = credentialSlice.reducer;
