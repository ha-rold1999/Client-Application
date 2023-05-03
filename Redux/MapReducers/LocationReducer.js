import { createSlice } from "@reduxjs/toolkit";
import { server, apiKey } from "../../Static";

export const locationSlice = createSlice({
  name: "locationSlice",
  initialState: { longitude: "", latitude: "", UUID: "" },
  reducers: {
    getLocation: (state, action) => {
      state.longitude = action.payload.longitude;
      state.latitude = action.payload.latitude;
      state.UUID = action.payload.UUID;

      fetch(`${server}/api/TemporaryRoute/MapLocation`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          uuid: state.UUID, // any UUID as long as you can access it.
          latitude: state.latitude,
          longitude: state.longitude,
          additionData: "POST Location of user",
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    },
    deleteLocationData: (state, action) => {
      state.UUID = "";
      state.latitude = "";
      state.longitude = "";
    },
  },
});

export const { getLocation, deleteLocationData } = locationSlice.actions;
export const locationSliceReducer = locationSlice.reducer;
