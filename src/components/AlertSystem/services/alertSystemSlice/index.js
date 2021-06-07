import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  alert: null,
};

const alertSystemSlice = createSlice({
  name: "alertSystem",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setAlert: (state, action) => {
      state.alert = action.payload;
    },
  },
});

export const { reset, setAlert } = alertSystemSlice.actions;

export default alertSystemSlice.reducer;
