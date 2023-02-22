import { createSlice } from "@reduxjs/toolkit";

const informationSlice = createSlice({
  name: "informationSlice",
  initialState: { data: null },
  reducers: {
    getAllData: (state, action) => {
      state.data = action.payload;
    },
  },
});

export const { getAllData } = informationSlice.actions;
export const data = (state) => state.informationSlice.data;
export const informationSliceReducer = informationSlice.reducer;
