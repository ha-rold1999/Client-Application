import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const mechanicListSlice = createSlice({
  name: "mechanicListSlice",
  initialState: {
    data: [],
    isLoading: true,
    error: null,
    services: [],
    enable: true,
  },
  reducers: {
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getServices: (state, action) => {
      state.services = action.payload;
    },
    getDataFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    setTabEnable: (state, action) => {
      state.enable = action.payload;
    },
  },
});

export const { getDataSuccess, getDataFail, getServices, setTabEnable } =
  mechanicListSlice.actions;
export const availableMechanics = (state) => state.mechanicListSlice.data;
export const isLoading = (state) => state.mechanicListSlice.isLoading;
export const enable = (state) => state.mechanicListSlice.enable;
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

export const checkRequests = (UUID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/ServiceRequest`, {
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        ClientUUID: UUID,
      },
    })
      .then((result) => result.json())
      .then((data) => {
        if (data.ServiceRequests.length) {
          dispatch(setTabEnable(false));
        } else {
          dispatch(setTabEnable(true));
        }
      })
      .catch((error) => dispatch(getDataFail(error.message)));
  } catch (error) {
    console.log(error);
  }
};
