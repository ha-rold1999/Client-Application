import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const requestStatusSlice = createSlice({
  name: "requestStatusSlice",
  initialState: { inSession: false, sessionID: null },
  reducers: {
    setInSession: (state, action) => {
      state.inSession = action.payload;
    },
    setSessionID: (state, action) => {
      state.sessionID = action.payload;
    },
  },
});

export const { setInSession, setSessionID } = requestStatusSlice.actions;
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
        }
      })
      .catch((error) => dispatch(console.log(error)));
  } catch (error) {
    console.log(error);
  }
};
