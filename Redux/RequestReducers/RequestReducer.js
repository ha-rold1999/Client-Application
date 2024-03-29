import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const requestServiceSlice = createSlice({
  name: "requestServiceSlice",
  initialState: {
    contact: "",
    vehicle: "",
    description: "",
    service: "",
    isRequesting: true,
    requestID: "",
    mechanicID: "",
    requestData: [],
  },
  reducers: {
    handleContact: (state, action) => {
      state.contact = action.payload;
    },
    handleVehicle: (state, action) => {
      state.vehicle = action.payload;
    },
    handleService: (state, action) => {
      state.service = action.payload;
    },
    handleDescription: (state, action) => {
      state.description = action.payload;
    },
    postRequest: (state, action) => {
      state.mechanicID = action.payload.mechanicID;
      fetch(`${server}/api/ServiceRequest`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          requestor: action.payload.userID,
          recepient: action.payload.mechanicID,
          contact: state.contact,
          location: "",
          vehicle: state.vehicle,
          service: state.service,
          description: state.description,
          picture: null,
          Status: "requesting",
          NewStatus: "requesting",
        }),
      })
        .then((res) => res.json())
        .catch((error) => console.log(error));
    },
    changeStatus: (state, action) => {
      state.requestData = action.payload;
    },

    getServiceRequest: (state, action) => {
      if (action.payload.Status === 200) {
        state.isRequesting = true;
      } else {
        state.isRequesting = false;
      }
    },
    deleteRequestData: (state, action) => {
      state.service = "";
    },
  },
});

export const {
  handleLocation,
  handleContact,
  handleVehicle,
  handleDescription,
  handleService,
  postRequest,
  getServiceRequest,
  changeStatus,
  deleteRequestData,
} = requestServiceSlice.actions;
export const requestServiceSliceReducer = requestServiceSlice.reducer;

export const fetchRequest = (mechanicID) => async (dispatch) => {
  try {
    await fetch(`${server}/api/ServiceRequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID: mechanicID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        dispatch(changeStatus(data.ServiceRequests));
      })
      .catch((error) => console.log(error));
  } catch (error) {
    console.log(error);
  }
};
