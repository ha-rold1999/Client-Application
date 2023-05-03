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
    requestID: null,
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
    getRequestID: (state, action) => {
      state.requestID = action.payload;
    },
    deleteData: (state, action) => {
      state.data = [];
      state.isLoading = true;
      state.error = null;
      state.services = [];
      state.enable = true;
      state.requestID = null;
    },
  },
});

export const {
  getDataSuccess,
  getDataFail,
  getServices,
  setTabEnable,
  getRequestID,
} = mechanicListSlice.actions;
export const availableMechanics = (state) => state.mechanicListSlice.data;
export const isLoading = (state) => state.mechanicListSlice.isLoading;
export const enable = (state) => state.mechanicListSlice.enable;
export const requestID = (state) => state.mechanicListSlice.requestID;
export const mechanicListSliceReducer = mechanicListSlice.reducer;

export const fetchAsyncData = () => async (dispatch) => {
  try {
    const response = await fetch(`${server}/api/Sessions/AvailableMechanics`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "Cache-Control": "no-cache",
        "AYUS-API-KEY": apiKey,
        pragma: "no-cache",
      },
    });
    const shops = await response.json();
    const dataArr = [];
    await Promise.all(
      shops.map(async (shop) => {
        const locResponse = await fetch(
          `${server}/api/TemporaryRoute/MapLocation`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              "AYUS-API-KEY": apiKey,
              UUID: shop.personalInformation.UUID,
            },
          }
        );
        const loc = await locResponse.json();

        const services = await fetch(`${server}/api/Mechanic/ServiceOffer`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "AYUS-API-KEY": apiKey,
            MechanicUUID: shop.personalInformation.UUID,
          },
        });
        const service = await services.json();

        dataArr.push({
          information: shop,
          loc: loc,
          service: service,
        });
      })
    );
    dispatch(getDataSuccess(dataArr));
  } catch (error) {
    dispatch(getDataFail(error.message));
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
          dispatch(getRequestID(data.ServiceRequests[0].RequestID));
        } else {
          dispatch(setTabEnable(true));
        }
      })
      .catch((error) => dispatch(getDataFail(error.message)));
  } catch (error) {
    console.log(error);
  }
};
