import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getAuthenticatedApi } from "./api.js";

export const getAuthenticated = createAsyncThunk(
  "authenticated/getAuthenticated",
  async (_, { rejectWithValue }) => {
    const data = await getAuthenticatedApi();

    if (data.success) {
      return data.payload;
    } else {
      return rejectWithValue();
    }
  }
);

const initialState = {
  isAuthenticated: false,
  user: null,
  getAuthenticatedRequestStatus: "idle",
};

const authenticatedSlice = createSlice({
  name: "authenticated",
  initialState,
  reducers: {
    resetAuthentication: (state, action) => {
      state.isAuthenticated = false;
      state.user = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAuthenticated.pending, (state, action) => {
        state.getAuthenticatedRequestStatus = "pending";
      })
      .addCase(getAuthenticated.rejected, (state, action) => {
        state.getAuthenticatedRequestStatus = "rejected";
      })
      .addCase(getAuthenticated.fulfilled, (state, action) => {
        state.getAuthenticatedRequestStatus = "fulfilled";

        const { authenticated, user } = action.payload;
        state.isAuthenticated = authenticated;
        state.user = user;
      });
  },
});

export const { resetAuthentication } = authenticatedSlice.actions;

export default authenticatedSlice.reducer;
