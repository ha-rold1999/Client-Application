import { createSlice } from "@reduxjs/toolkit";
import { apiKey, server } from "../../Static";

export const informationSlice = createSlice({
  name: "informationSlice",
  initialState: { data: null, Profile: null },
  reducers: {
    getAllData: (state, action) => {
      state.data = action.payload;
    },
    getProfilePic: (state, action) => {
      state.Profile = action.payload;
    },
  },
});

export const { getAllData, getProfilePic } = informationSlice.actions;
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

export const changePassword = (UUID, NewPassword) => () => {
  console.log("Change Password");
  try {
    fetch(`${server}/api/Account/Password?uuid=${UUID}`, {
      method: "PUT",
      headers: {
        "AYUS-API-KEY": apiKey,
        "new-password": NewPassword,
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

export const changeInfo =
  (UUID, Firstname, Lastname, Contact, Birthdate, Address, License, Expiry) =>
  () => {
    try {
      fetch(`${server}/api/Account/PersonalInformation`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "AYUS-API-KEY": apiKey,
        },
        body: JSON.stringify({
          UUID: UUID,
          Firstname: Firstname,
          Lastname: Lastname,
          Contact: Contact,
          Birthdate: Birthdate,
          Address: Address,
          LicenseNumber: License,
          Expiry: new Date(Date.parse(Expiry)),
        }),
      })
        .then((res) => res.json())
        .catch((err) => console.log(err));
    } catch (error) {
      console.log(error);
    }
  };

export const profilePIc = (UUID, dispatch) => async () => {
  console.log(UUID);
  try {
    const response = await fetch(`${server}/api/Upload/files/${UUID}/PROFILE`, {
      method: "GET",
    });

    if (response.ok) {
      const blob = await response.blob();
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        const base64data = reader.result;
        dispatch(getProfilePic(base64data));
      };
    } else {
      console.log("Failed to get the profile picture");
    }
  } catch (error) {
    console.log(error);
  }
};
