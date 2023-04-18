import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

const initialState: any = {
    phone: "",
    type: "authorization",
    newPasswordType: "regPass",
    code: "",

  token: null,
  isLoggedIn: false,
};

export const authenticationSlice = createSlice({
    name: "authentication",
    initialState,
    reducers: {
        setUser(state, action) {
            state.phone = action.payload.phone;
            state.type = action.payload.type;
            state.code = action.payload.code;
        },
        setType(state, action) {
            state.type = action.payload;
        },
        setNewPasswordType(state, action) {
            state.newPasswordType = action.payload;
        },
        setPhone(state, action: PayloadAction<string>) {
            state.phone = action.payload;
        },
        onLogin: (state, action: PayloadAction<string>) => {
            state.token = action.payload;
            state.isLoggedIn = true;
        },
        onLogout: (state) => {
            state.token = null;
            state.isLoggedIn = false;
        },
        setIsLogged: (state, action: PayloadAction<string>) => {
            state.isLoggedIn = true;
            state.token = action.payload;
        },
    },
});

export const {
    setUser,
    setPhone,
    setType,
    setNewPasswordType,
    setIsLogged,
    onLogin,
    onLogout,
} = authenticationSlice.actions;
export default authenticationSlice.reducer;
