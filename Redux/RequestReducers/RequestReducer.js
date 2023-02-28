import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const requestServiceSlice = createSlice({
  name: "requestServiceSlice",
  initialState: {
    location: "",
    contact: "",
    vehicle: "",
    description: "",
    service: "",
    isRequesting:true,
    requestID:"",
    mechanicID:"",
    requestData:[]
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
          location: state.location,
          vehicle: state.vehicle,
          service: state.service,
          description: state.description,
          picture: null,
          NewStatus:"requesting"
        }),
      })
        .then((res) => res.json())
        .then((response) =>  console.log(response))
        .catch((error) => console.log(error));
    },
    changeStatus:(state, action)=>{
      state.requestData = action.payload
    },

    getServiceRequest: (state, action) => {
      console.log(JSON.stringify(action.payload, null, 2))
      if(action.payload.Status === 200){
        state.isRequesting = true
      }else{state.isRequesting=false}
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
  changeStatus
} = requestServiceSlice.actions;
export const requestServiceSliceReducer = requestServiceSlice.reducer;

export const fetchRequest = (mechanicID)=>async(dispatch)=>{
  console.log("fetch: "+ mechanicID)
  try{
    await fetch(`${server}/api/ServiceRequest`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "AYUS-API-KEY": apiKey,
        MechanicUUID:mechanicID,
      },
    })
      .then((res) => res.json())
      .then((data) =>{dispatch(changeStatus(data.ServiceRequests))})
      .catch((error) => console.log(error));
  }catch(error){console.log(error)}
}
