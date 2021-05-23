import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLogoutApi } from "./api.js";

import { resetAuthentication } from "../../../../../../services/authenticatedSlice";

export const getLogout = createAsyncThunk(
  "dashboard/getLogout",
  async (_, { dispatch, rejectWithValue }) => {
    const data = await getLogoutApi();

    if (data.success) {
      dispatch(resetAuthentication());
      return true;
    } else {
      rejectWithValue();
    }
  }
);

const initialState = {
  getLogoutRequestStatus: "idle",
};

const accountDashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogout.pending, (state, action) => {
        state.getLogoutRequestStatus = "pending";
      })
      .addCase(getLogout.rejected, (state, action) => {
        state.getLogoutRequestStatus = "rejected";
      })
      .addCase(getLogout.fulfilled, (state, action) => {
        state.getLogoutRequestStatus = "fulfilled";
      });
  },
});

export const { reset } = accountDashboardSlice.actions;

export default accountDashboardSlice.reducer;
