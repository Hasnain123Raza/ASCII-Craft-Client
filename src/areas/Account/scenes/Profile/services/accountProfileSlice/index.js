import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getProfileApi } from "./api";

export const getProfile = createAsyncThunk(
  "profile/getProfile",
  async (userId, { rejectWithValue }) => {
    const { success, payload } = await getProfileApi(userId);

    if (success) {
      return payload;
    } else {
      return rejectWithValue();
    }
  }
);

const initialState = {
  profileData: {},
  getProfileRequestStatus: "idle",
};

const accountProfileSlice = createSlice({
  name: "profile",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getProfile.pending, (state, action) => {
        state.getProfileRequestStatus = "pending";
      })
      .addCase(getProfile.rejected, (state, action) => {
        state.getProfileRequestStatus = "rejected";
      })
      .addCase(getProfile.fulfilled, (state, action) => {
        state.getProfileRequestStatus = "fulfilled";
        state.profileData = action.payload;
      });
  },
});

export const { reset } = accountProfileSlice.actions;

export default accountProfileSlice.reducer;
