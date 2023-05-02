import { createSlice } from "@reduxjs/toolkit";

const loginSlice = createSlice({
  name: "loginSlice",
  initialState: {
    username: "",
    password: "",
    usernameError: "",
    passwordError: "",
    formError: "",
  },
  reducers: {
    handleUsername: (state, action) => {
      state.username = action.payload;
    },
    handlePassword: (state, action) => {
      state.password = action.payload;
    },
    checkLoginForm: (state, action) => {
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
        state.passwordError = "Enter a valid password";
      } else {
        state.passwordError = "";
      }

      if (!state.passwordError && !state.usernameError) {
        state.formError = false;
      } else {
        state.formError = true;
      }
    },
  },
});

export const { handleUsername, handlePassword, checkLoginForm } =
  loginSlice.actions;
export const username = (state) => state.loginSlice.username;
export const password = (state) => state.loginSlice.password;
export const usernameError = (state) => state.loginSlice.usernameError;
export const passwordError = (state) => state.loginSlice.passwordError;
export const formError = (state) => state.loginSlice.formError;

export const loginSliceReducer = loginSlice.reducer;
