import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRecoverPasswordApi } from "./api.js";
import recoverPasswordFormSchema from "../recoverPasswordFormSchema.js";

export const postRecoverPassword = createAsyncThunk(
  "recoverPassword/postRecoverPassword",
  async (recoverPasswordEmail, { dispatch, rejectWithValue }) => {
    const validationResult = recoverPasswordFormSchema.validate(
      recoverPasswordEmail,
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
      const data = await postRecoverPasswordApi(recoverPasswordEmail);

      if (data.success) {
        dispatch(setValidationErrors([]));
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
