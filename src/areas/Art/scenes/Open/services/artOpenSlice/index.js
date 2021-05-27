import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtApi, getDeleteArtApi } from "./api.js";

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

export const getDeleteArt = createAsyncThunk(
  "open/getDeleteArt",
  async (artId, { rejectWithValue }) => {
    const { success, payload } = await getDeleteArtApi(artId);

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
  getDeleteArtRequestStatus: "idle",
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
      })
      .addCase(getDeleteArt.pending, (state, action) => {
        state.getDeleteArtRequestStatus = "pending";
      })
      .addCase(getDeleteArt.rejected, (state, action) => {
        state.getDeleteArtRequestStatus = "rejected";
      })
      .addCase(getDeleteArt.fulfilled, (state, action) => {
        state.getDeleteArtRequestStatus = "fulfilled";
      });
  },
});

export const { reset } = artOpenSlice.actions;

export default artOpenSlice.reducer;
