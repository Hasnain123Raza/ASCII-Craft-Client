import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRegisterUserApi } from "./api.js";
import registerFormSchema from "../registerFormSchema.js";

import { getAuthenticated } from "../../../../../../services/authenticatedSlice";

export const postRegisterUser = createAsyncThunk(
  "register/postRegisterUser",
  async (userAndRecaptchaToken, { dispatch, rejectWithValue }) => {
    const validationResult = registerFormSchema.validate(
      userAndRecaptchaToken,
      {
        abortEarly: false,
      }
    );

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
      const data = await postRegisterUserApi(userAndRecaptchaToken);

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
  email: "",
  password: "",
  recaptchaToken: "",
  postRegisterUserRequestStatus: "idle",
  validationErrors: [],
};

const authenticationRegisterSlice = createSlice({
  name: "register",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setUsername: (state, action) => {
      state.username = action.payload;
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(postRegisterUser.pending, (state, action) => {
        state.postRegisterUserRequestStatus = "pending";
      })
      .addCase(postRegisterUser.rejected, (state, action) => {
        if (action.payload !== "preventStateUpdates")
          state.postRegisterUserRequestStatus = "rejected";
      })
      .addCase(postRegisterUser.fulfilled, (state, action) => {
        state.postRegisterUserRequestStatus = "fulfilled";
      });
  },
});

export const {
  reset,
  setUsername,
  setEmail,
  setPassword,
  setRecaptchaToken,
  setValidationErrors,
} = authenticationRegisterSlice.actions;

export default authenticationRegisterSlice.reducer;
