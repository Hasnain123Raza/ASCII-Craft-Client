import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postNewPasswordApi } from "./api.js";
import newPasswordFormSchema from "../newPasswordFormSchema.js";

export const postNewPassword = createAsyncThunk(
  "newPassword/postNewPassword",
  async (newPasswordAndToken, { dispatch, rejectWithValue }) => {
    const validationResult = newPasswordFormSchema.validate(
      newPasswordAndToken,
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
      const data = await postNewPasswordApi(newPasswordAndToken);

      if (data.success) {
        return data;
      } else {
        if (data.error) {
          dispatch(setValidationErrors([data.error]));
        }
        return rejectWithValue();
      }
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
