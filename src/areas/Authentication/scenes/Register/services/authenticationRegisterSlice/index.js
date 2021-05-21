import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { postRegisterUserApi } from "./api.js";
import userSchema from "../../../../services/userSchema.js";

export const postRegisterUser = createAsyncThunk(
  "register/postRegisterUser",
  async (user, { dispatch, rejectWithValue }) => {
    const validationResult = userSchema.validate(user, { abortEarly: false });

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
      const data = await postRegisterUserApi(user);

      if (data.success) {
        return data;
      } else {
        if (data.error) {
          dispatch(setValidationErrors([data.error]));
        }
        rejectWithValue();
      }
    }
  }
);

const initialState = {
  username: "",
  password: "",
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

    setPassword: (state, action) => {
      state.password = action.payload;
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
        state.postRegisterUserRequestStatus = "rejected";
      })
      .addCase(postRegisterUser.fulfilled, (state, action) => {
        state.postRegisterUserRequestStatus = "fulfilled";
      });
  },
});

export const { reset, setUsername, setPassword, setValidationErrors } =
  authenticationRegisterSlice.actions;

export default authenticationRegisterSlice.reducer;
