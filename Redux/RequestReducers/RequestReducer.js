import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../Static";

export const requestServiceSlice = createSlice({
  name: "requestServiceSlice",
  initialState: {
    location: "",
    contact: "",
    vehicle: "",
    description: "",
    service: "",
  },
  reducers: {
    handleLocation: (state, action) => {
      state.location = action.payload;
    },
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
      console.log(state.contact);
      console.log(state.description);
      console.log(state.location);
      console.log(state.service);
      console.log(state.vehicle);
      console.log(action.payload.userID);
      console.log(action.payload.mechanicID);
      fetch("http://203.177.71.218:5003/api/ServiceRequest", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          requestor: action.payload.userID,
          recepient: action.payload.mechanicID,
          contact: state.contact,
          location: state.location,
          vehicle: state.vehicle,
          service: state.service,
          description: state.description,
          picture: null,
        }),
      })
        .then((res) => res.json())
        .then((response) => console.log(response))
        .catch((error) => console.log(error));
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
} = requestServiceSlice.actions;
export const requestServiceSliceReducer = requestServiceSlice.reducer;
