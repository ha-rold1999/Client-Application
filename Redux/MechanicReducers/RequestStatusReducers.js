import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const requestStatusSlice = createSlice({
  name: "requestStatusSlice",
  initialState: { inSession: false },
  reducers: {
    setInSession: (state, action) => {
      state.inSession = action.payload;
    },
  },
});

export const { setInSession } = requestStatusSlice.actions;
export const requestStatusSliceReucer = requestStatusSlice.reducer;

export const checkInSession = (UUID) => async (dispatch) => {
  console.log("UUID:" + UUID);
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
        }
      })
      .catch((error) => dispatch(console.log(error)));
  } catch (error) {
    console.log(error);
  }
};
