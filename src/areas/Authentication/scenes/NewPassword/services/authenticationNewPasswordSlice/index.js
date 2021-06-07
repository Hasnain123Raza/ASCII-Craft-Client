import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postNewPasswordApi } from "./api.js";
import newPasswordFormSchema from "../newPasswordFormSchema.js";
import processPostFormRequest from "../../../../../../services/functions/processPostFormRequest.js";

export const postNewPassword = createAsyncThunk(
  "newPassword/postNewPassword",
  async (newPasswordAndToken, { dispatch, rejectWithValue }) => {
    const formResponse = await processPostFormRequest(
      newPasswordAndToken,
      newPasswordFormSchema,
      postNewPasswordApi,
      dispatch,
      setValidationErrors
    );

    const { success } = formResponse;

    if (success) {
      return formResponse.payload;
    } else {
      return rejectWithValue();
    }
  }
);

const initialState = {
  password: "",
  postNewPasswordRequestStatus: "idle",
  validationErrors: [],
};

const authenticationNewPasswordSlice = createSlice({
  name: "newPassword",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postNewPassword.pending, (state, action) => {
        state.postNewPasswordRequestStatus = "pending";
      })
      .addCase(postNewPassword.rejected, (state, action) => {
        state.postNewPasswordRequestStatus = "rejected";
      })
      .addCase(postNewPassword.fulfilled, (state, action) => {
        state.postNewPasswordRequestStatus = "fulfilled";
      });
  },
});

export const { reset, setPassword, setValidationErrors } =
  authenticationNewPasswordSlice.actions;

export default authenticationNewPasswordSlice.reducer;
