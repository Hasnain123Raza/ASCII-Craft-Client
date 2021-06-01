import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postLoginUserApi } from "./api.js";
import loginFormSchema from "../loginFormSchema.js";

import { getAuthenticated } from "../../../../../../services/authenticatedSlice";

export const postLoginUser = createAsyncThunk(
  "login/postLoginUser",
  async (userAndRecaptchaToken, { dispatch, rejectWithValue }) => {
    const validationResult = loginFormSchema.validate(userAndRecaptchaToken, {
      abortEarly: false,
    });

    if (validationResult.error) {
      const validationErrors = validationResult.error.details.map(
        ({ message, path }) => ({
          message,
          path,
        })
      );

      dispatch(setValidationErrors(validationErrors));
      return rejectWithValue();
    } else {
      dispatch(setValidationErrors([]));
      const data = await postLoginUserApi(userAndRecaptchaToken);

      if (data.success) {
        await dispatch(getAuthenticated());
        return data;
      } else {
        if (data.error.authenticated) {
          await dispatch(getAuthenticated());
          return rejectWithValue("preventStateUpdates");
        }
        if (data.error) {
          dispatch(setValidationErrors([data.error]));
        }
        return rejectWithValue();
      }
    }
  }
);

const initialState = {
  username: "",
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

    setUsername: (state, action) => {
      state.username = action.payload;
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
  setUsername,
  setPassword,
  setRecaptchaToken,
  setValidationErrors,
} = authenticationLoginSlice.actions;

export default authenticationLoginSlice.reducer;
