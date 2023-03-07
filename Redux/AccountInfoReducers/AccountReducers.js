import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

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

export const deleteAccount = (UUID) => () => {
  try {
    fetch(`${server}/api/Account`, {
      method: "DELETE",
      headers: {
        "AYUS-API-KEY": apiKey,
        uuid: UUID,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(JSON.stringify(data, null, 2));
      })
      .catch((err) => console.log(err));
  } catch (error) {
    console.log(error);
  }
};
