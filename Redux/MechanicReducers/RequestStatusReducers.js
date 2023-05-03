import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const requestStatusSlice = createSlice({
  name: "requestStatusSlice",
  initialState: {
    inSession: false,
    sessionID: null,
    mechID: null,
    sessionDetails: null,
    transactionID: null,
    rating: null,
    myRating: null,
    serviceFee: null,
  },
  reducers: {
    setInSession: (state, action) => {
      state.inSession = action.payload;
    },
    setMechanicID: (state, action) => {
      state.mechID = action.payload;
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
    setRating: (state, action) => {
      state.rating = action.payload;
    },
    setMyRating: (state, action) => {
      state.myRating = action.payload;
    },
    setServiceFee: (state, action) => {
      state.serviceFee = action.payload;
    },
    deleteRequestStatusData: (state, action) => {
      state.inSession = false;
      state.sessionID = null;
      state.mechID = null;
      state.sessionDetails = null;
      state.transactionID = null;
      state.rating = null;
      state.myRating = null;
      state.serviceFee = null;
    },
  },
});

export const {
  setInSession,
  setSessionID,
  setSessionDetails,
  setTransactionID,
  setRating,
  setMyRating,
  setMechanicID,
  setServiceFee,
  deleteRequestStatusData,
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
          dispatch(setMechanicID(data.foundData.SessionData.MechanicUUID));
          dispatch(
            setSessionDetails(data.foundData.SessionData.SessionDetails)
          );
        } else {
          dispatch(setInSession(false));
        }
      })
      .catch((error) => dispatch(console.log(error)));
  } catch (error) {
    console.log(error);
  }
};

export const endSession = (UUID, TransactionID) => () => {
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

export const postReview = (mechID, rating) => () => {
  try {
    fetch(`${server}/api/Account/Rating`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        uuid: mechID,
      },
      body: JSON.stringify({
        Rating: rating,
      }),
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const getReview = (uuid, active) => (dispatch) => {
  try {
    fetch(`${server}/api/Account/Rating`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        uuid: uuid,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        if (active === "Profile") {
          dispatch(setMyRating(response));
        } else {
          dispatch(setRating(response));
        }
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export const fetchDeleteReq = (clientID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/ServiceRequest`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ServiceRequestUUID: clientID,
      },
    })
      .then((res) => res.json())
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
