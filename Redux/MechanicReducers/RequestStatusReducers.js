import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const requestStatusSlice = createSlice({
  name: "requestStatusSlice",
  initialState: {
    inSession: false,
    sessionID: null,
    sessionDetails: null,
    transactionID: null,
  },
  reducers: {
    setInSession: (state, action) => {
      state.inSession = action.payload;
    },
    setSessionID: (state, action) => {
      state.sessionID = action.payload;
    },
    setSessionDetails: (state, action) => {
      state.sessionDetails = action.payload;
    },
    setTransactionID: (state, action) => {
      state.transactionID = action.payload;
    },
  },
});

export const {
  setInSession,
  setSessionID,
  setSessionDetails,
  setTransactionID,
} = requestStatusSlice.actions;
export const requestStatusSliceReucer = requestStatusSlice.reducer;

export const checkInSession = (UUID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/Sessions/GetSession`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ClientUUID: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.Status === 200) {
          dispatch(setInSession(true));
          dispatch(setSessionID(data.foundData.SessionData.SessionID));
          dispatch(
            setSessionDetails(data.foundData.SessionData.SessionDetails)
          );
        }
      })
      .catch((error) => dispatch(console.log(error)));
  } catch (error) {
    console.log(error);
  }
};

export const endSession = (UUID, TransactionID) => () => {
  console.log("ending session");
  try {
    fetch(`${server}/api/Sessions/EndSession`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        SessionID: UUID,
        TransactionID: TransactionID,
        Flag: "Success",
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch((error) => dispatch(console.log(error)));
  } catch (error) {
    console.log(error);
  }
};

export const postTransaction = (ServiceName, Price) => (dispatch) => {
  try {
    fetch(`${server}/api/Transaction`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
      },
      body: JSON.stringify({
        ServiceName: ServiceName,
        ServicePrice: parseFloat(Price),
        Remark: "Success Transaction",
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(setTransactionID(data.TransactionID));
      })
      .catch((error) => dispatch(console.log(error)));
  } catch (error) {
    console.log(error);
  }
};
