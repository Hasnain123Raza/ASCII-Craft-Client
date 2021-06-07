import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmailVerificationApi } from "./api.js";
import { setAlert } from "../../../../../../components/AlertSystem/services/alertSystemSlice";

export const getEmailVerification = createAsyncThunk(
  "authenticationEmailVerification/getEmailVerification",
  async (token, { dispatch, rejectWithValue }) => {
    const data = await getEmailVerificationApi(token);

    if (data.success) {
      return true;
    } else {
      if (data.errors) {
        if (data.errors[0].path[0] === "alert")
          dispatch(
            setAlert({ variant: "danger", message: data.errors[0].message })
          );
        else dispatch(setErrors(data.errors));
      }

      return rejectWithValue();
    }
  }
);

const initialState = {
  getEmailVerificationRequestStatus: "idle",
  errors: [],
};

const authenticationEmailVerificationSlice = createSlice({
  name: "emailVerification",
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
      });
  },
});

export const { reset, setErrors } =
  authenticationEmailVerificationSlice.actions;

export default authenticationEmailVerificationSlice.reducer;
