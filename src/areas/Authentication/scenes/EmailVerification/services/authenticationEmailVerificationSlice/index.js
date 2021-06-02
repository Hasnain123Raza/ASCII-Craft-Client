import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getEmailVerificationApi } from "./api.js";

export const getEmailVerification = createAsyncThunk(
  "authenticationEmailVerification/getEmailVerification",
  async (token, { dispatch, rejectWithValue }) => {
    const data = await getEmailVerificationApi(token);

    if (data.success) {
      return true;
    } else {
      if (data.error) {
        dispatch(setErrors([data.error]));
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
