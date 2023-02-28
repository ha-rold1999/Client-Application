import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const mechanicListSlice = createSlice({
  name: "mechanicListSlice",
  initialState: { data: [], isLoading: false, error: null, services: [] },
  reducers: {
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getServices: (state, action) => {
      state.services = action.payload;
      console.log(JSON.stringify(state.services, null, 2));
    },
    getDataFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { getDataSuccess, getDataFail, getServices } =
  mechanicListSlice.actions;
export const availableMechanics = (state) => state.mechanicListSlice.data;
export const isLoading = (state) => state.mechanicListSlice.isLoading;
export const mechanicListSliceReducer = mechanicListSlice.reducer;

export const fetchAsyncData = () => async (dispatch) => {
  try {
    await fetch(`${server}/api/Sessions/AvailableMechanics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
      },
    })
      .then((res) => res.json())
      .then((data) => dispatch(getDataSuccess(data)))
      .catch((error) => dispatch(getDataFail(error.message)));
  } catch (error) {
    console.log(error);
  }
};

export const fetchService = (UUID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/Mechanic/ServiceOffer`, {
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID: UUID,
      },
    })
      .then((result) => result.json())
      .then((data) => dispatch(getServices(data.Info)))
      .catch((error) => dispatch(getDataFail(error.message)));
  } catch (error) {
    console.log(error);
  }
};
