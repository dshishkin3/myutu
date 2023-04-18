import { configureStore } from "@reduxjs/toolkit";
import { createWrapper } from "next-redux-wrapper";
import authenticationReducer from "./slices/authentication.slices";
import { middleware } from "middleware";
import { api } from "./services/api";
import profileSlice from "./slices/profileSlice";
import headerSlice from "../web/features/header/model/headerSlice";
import adSlice from "./slices/adSlice";
import searchSlice from "./slices/searchSlice";
import snackbarSlice from "./slices/snackbar.slice";

export const store = () =>
  configureStore({
    reducer: {
      authentication: authenticationReducer,
      profile: profileSlice,
      ad: adSlice,
      header: headerSlice,
      search: searchSlice,
      snackbar: snackbarSlice,
      [api.reducerPath]: api.reducer,
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().concat(api.middleware),
  });

export type AppStore = ReturnType<typeof store>;
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];

export const wrapper = createWrapper<AppStore>(store, { debug: false });
