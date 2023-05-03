import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const mechanicLocationSlice = createSlice({
  name: "mechanicLocationSlice",
  initialState: { longitude: "", latitude: "" },
  reducers: {
    getMechanicLocation: (state, action) => {
      state.latitude = action.payload.Data.Latitude;
      state.longitude = action.payload.Data.Longitude;
    },
    deleteData: (state, action) => {
      state.latitude = "";
      state.longitude = "";
    },
  },
});

export const { getMechanicLocation } = mechanicLocationSlice.actions;
export const mechanicLocationSliceReducer = mechanicLocationSlice.reducer;

export const fetchMechaniLocation = (UUID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/TemporaryRoute/MapLocation`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        UUID: UUID,
      },
    })
      .then((res) => res.json())
      .then((response) => {
        dispatch(getMechanicLocation(response));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
