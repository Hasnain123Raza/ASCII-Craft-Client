import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtApi } from "./api.js";

export const getArt = createAsyncThunk(
  "open/getArt",
  async (artId, { rejectWithValue }) => {
    const { success, payload } = await getArtApi(artId);

    if (!success) {
      return rejectWithValue();
    } else {
      return payload;
    }
  }
);

const initialState = {
  art: {},
  getArtRequestStatus: "idle",
};

const artOpenSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArt.pending, (state, action) => {
        state.getArtRequestStatus = "pending";
      })
      .addCase(getArt.rejected, (state, action) => {
        state.getArtRequestStatus = "rejected";
      })
      .addCase(getArt.fulfilled, (state, action) => {
        state.getArtRequestStatus = "fulfilled";
        state.art = action.payload;
      });
  },
});

export const { reset } = artOpenSlice.actions;

export default artOpenSlice.reducer;
