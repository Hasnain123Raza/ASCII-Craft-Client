import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { selectHasLoaded } from "./selectors.js";

import { getAuthenticated } from "../authenticatedSlice";

export const loadResources = createAsyncThunk(
  "loader/loadResources",
  async (_, { getState, dispatch, rejectWithValue }) => {
    if (!selectHasLoaded(getState())) {
      const result = await Promise.all([dispatch(getAuthenticated())]);
      if (result.some((element) => Boolean(element.error)))
        return rejectWithValue();
    }
  }
);

const initialState = {
  hasLoaded: false,
  loadResourcesRequestStatus: "idle",
};

const loaderSlice = createSlice({
  name: "loader",
  initialState,
  reducers: {
    setHasLoaded: (state, action) => {
      state.hasLoaded = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loadResources.pending, (state, action) => {
        state.loadResourcesRequestStatus = "pending";
      })
      .addCase(loadResources.rejected, (state, action) => {
        state.loadResourcesRequestStatus = "rejected";
      })
      .addCase(loadResources.fulfilled, (state, action) => {
        state.loadResourcesRequestStatus = "fulfilled";
      });
  },
});

export default loaderSlice.reducer;
