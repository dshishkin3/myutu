import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";

type initialStateProps = {
  show: boolean;
  label: string;
  type: boolean | null;
};

const initialState: initialStateProps = {
  show: false,
  label: "",
  type: null,
};

const snackbarSlice = createSlice({
  name: "snackbarSlice",
  initialState,
  reducers: {
    setSnackbar(
      state,
      action: PayloadAction<{ show: boolean; label: string; type: boolean }>
    ) {
      const { show, label, type } = action.payload;

      state.show = show;
      state.label = label;
      state.type = type;
    },
    closeSnackbar(state, action: PayloadAction<boolean>) {
      state.show = action.payload;
    },
  },
});

export const { setSnackbar, closeSnackbar } = snackbarSlice.actions;
export default snackbarSlice.reducer;
