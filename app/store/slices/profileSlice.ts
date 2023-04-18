import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
  id: "",
  login: "",
  image: "",
  saphires: 0,
  friendlyCode: "",
  subscriptions: 0,
  subscribers: 0,
  averageGrade: 0,
  reviews: 0,
  phoneNumber: "",
  birthDate: "",
  gender: "",
  surname: "",
  name: "",
  patronymicName: "",
  city: {
    name: "",
    id: ""
  },
};

export const profileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    setProfile: (state, action: PayloadAction<any>) => {
      Object.keys(action.payload).map((key) => {
        state[key] = action.payload[key];
      });
    },
    setProfileValue: (state, action: PayloadAction<any>) => {
      const { name, value } = action.payload;
      state[name] = value;
    },
    logoutUser: (state) => {
      state.id = "";
    },
    setCity: (state, action: PayloadAction<any>) => {
      state.city.name = action.payload.name;
      state.city.id = action.payload.id;
    }
  },
});

export const { setProfile, setProfileValue, logoutUser, setCity } = profileSlice.actions;
export default profileSlice.reducer;
