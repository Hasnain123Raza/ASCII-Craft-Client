import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRecoverPasswordApi } from "./api.js";
import recoverPasswordFormSchema from "../recoverPasswordFormSchema.js";
import processPostFormRequest from "../../../../../../services/functions/processPostFormRequest.js";

export const postRecoverPassword = createAsyncThunk(
  "recoverPassword/postRecoverPassword",
  async (recoverPasswordEmail, { dispatch, rejectWithValue }) => {
    const formResponse = await processPostFormRequest(
      recoverPasswordEmail,
      recoverPasswordFormSchema,
      postRecoverPasswordApi,
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
  email: "",
  validationErrors: [],
  postRecoverPasswordRequestStatus: "idle",
};

const authenticationRecoverPasswordSlice = createSlice({
  name: "recoverPassword",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRecoverPassword.pending, (state, action) => {
        state.postRecoverPasswordRequestStatus = "pending";
      })
      .addCase(postRecoverPassword.rejected, (state, action) => {
        state.postRecoverPasswordRequestStatus = "rejected";
      })
      .addCase(postRecoverPassword.fulfilled, (state, action) => {
        state.postRecoverPasswordRequestStatus = "fulfilled";
      });
  },
});

export const { reset, setEmail, setValidationErrors } =
  authenticationRecoverPasswordSlice.actions;

export default authenticationRecoverPasswordSlice.reducer;
