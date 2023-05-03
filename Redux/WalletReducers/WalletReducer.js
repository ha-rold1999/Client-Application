import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const walletSlice = createSlice({
  name: "walletSlice",
  initialState: { pincode: "", balance: 0 },
  reducers: {
    getWallet: (state, action) => {
      state.pincode = action.payload.WalletData.Pincode;
      state.balance = action.payload.WalletData.Balance;
    },
    setWallet: (state, action) => {
      state.pincode = action.payload.pincode;
      state.balance = action.payload.balance;
    },
    deleteData: (state, action) => {
      state.balance = 0;
      state.pincode = "";
    },
  },
});

export const { getWallet, setWallet } = walletSlice.actions;
export const walletSliceReducer = walletSlice.reducer;

export const getUserWallet = (UUID, setIsLoading) => (dispatch) => {
  try {
    fetch(`${server}/api/Wallet?uuid=${UUID}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(getWallet(response));
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const setWalletPin = (UUID, Pin) => () => {
  try {
    fetch(`${server}/api/Wallet?uuid=${UUID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        newbalance: 0,
        pincode: Pin,
      },
    }).catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const addBalance = (UUID, balance) => () => {
  try {
    fetch(`${server}/api/Wallet?uuid=${UUID}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        newbalance: balance,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
