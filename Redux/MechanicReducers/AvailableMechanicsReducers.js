import { createSlice } from "@reduxjs/toolkit";
import { apiKey } from "../../Static";

export const mechanicListSlice = createSlice({
  name: "mechanicListSlice",
  initialState: { data: [], isLoading: false, error: null },
  reducers: {
    getDataSuccess: (state, action) => {
      state.data = action.payload;
      state.isLoading = false;
    },
    getDataFail: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

export const { getDataSuccess, getDataFail } = mechanicListSlice.actions;
export const availableMechanics = (state) => state.mechanicListSlice.data;
export const isLoading = (state) => state.mechanicListSlice.isLoading;
export const mechanicListSliceReducer = mechanicListSlice.reducer;

export const fetchAsyncData = () => async (dispatch) => {
  try {
    await fetch("http://203.177.71.218:5003/api/Sessions/AvailableMechanics", {
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
