import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getLogoutApi, getEmailVerificationApi } from "./api.js";

import { setAlert } from "../../../../../../components/AlertSystem/services/alertSystemSlice";
import { resetAuthentication } from "../../../../../../services/authenticatedSlice";

export const getEmailVerification = createAsyncThunk(
  "dashboard/getEmailVerification",
  async (_, { dispatch, rejectWithValue }) => {
    const data = await getEmailVerificationApi();

    if (data.success) {
      dispatch(setErrors([]));
      return true;
    } else {
      if (data.errors) {
        if (data.errors[0].path[0] === "alert")
          dispatch(
            setAlert({ variant: "danger", message: data.errors[0].message })
          );
        else dispatch(setErrors(data.errors));
      }

      rejectWithValue();
    }
  }
);

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
  getEmailVerificationRequestStatus: "idle",
  getLogoutRequestStatus: "idle",
  errors: [],
};

const accountDashboardSlice = createSlice({
  name: "dashboard",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setErrors: (state, action) => {
      state.errors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getEmailVerification.pending, (state, action) => {
        state.getEmailVerificationRequestStatus = "pending";
      })
      .addCase(getEmailVerification.rejected, (state, action) => {
        state.getEmailVerificationRequestStatus = "rejected";
      })
      .addCase(getEmailVerification.fulfilled, (state, action) => {
        state.getEmailVerificationRequestStatus = "fulfilled";
      })
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

export const { reset, setErrors } = accountDashboardSlice.actions;

export default accountDashboardSlice.reducer;
