import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLoginUserApi } from "./api.js";
import loginFormSchema from "../loginFormSchema.js";
import processPostFormRequest from "../../../../../../services/functions/processPostFormRequest.js";

import { getAuthenticated } from "../../../../../../services/authenticatedSlice";

export const postLoginUser = createAsyncThunk(
  "login/postLoginUser",
  async (userAndRecaptchaToken, { dispatch, rejectWithValue }) => {
    const formResponse = await processPostFormRequest(
      userAndRecaptchaToken,
      loginFormSchema,
      postLoginUserApi,
      dispatch,
      setValidationErrors
    );

    const { success } = formResponse;

    if (success) {
      await dispatch(getAuthenticated());
      return formResponse.payload;
    } else {
      if (formResponse.errors[0].path[0] === "authentication") {
        await dispatch(getAuthenticated());
        return rejectWithValue("preventStateUpdates");
      }

      return rejectWithValue();
    }
  }
);

const initialState = {
  email: "",
  password: "",
  recaptchaToken: "",
  validationErrors: [],
  postLoginUserRequestStatus: "idle",
};

const authenticationLoginSlice = createSlice({
  name: "login",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setEmail: (state, action) => {
      state.email = action.payload;
    },

    setPassword: (state, action) => {
      state.password = action.payload;
    },

    setRecaptchaToken: (state, action) => {
      state.recaptchaToken = action.payload;
    },

    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },

    setPostLoginUserRequestStatus: (state, action) => {
      state.postLoginUserRequestStatus = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postLoginUser.pending, (state, action) => {
        state.postLoginUserRequestStatus = "pending";
      })
      .addCase(postLoginUser.rejected, (state, action) => {
        if (action.payload !== "preventStateUpdates")
          state.postLoginUserRequestStatus = "rejected";
      })
      .addCase(postLoginUser.fulfilled, (state, action) => {
        state.postLoginUserRequestStatus = "fulfilled";
      });
  },
});

export const {
  reset,
  setEmail,
  setPassword,
  setRecaptchaToken,
  setValidationErrors,
} = authenticationLoginSlice.actions;

export default authenticationLoginSlice.reducer;
