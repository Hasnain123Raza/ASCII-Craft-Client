import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  getArtApi,
  getDeleteArtApi,
  getLikeArtApi,
  getUnlikeArtApi,
} from "./api.js";
import { selectLikes } from "./selectors.js";

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

export const getLikeArt = createAsyncThunk(
  "open/getLikeArt",
  async ({ artId, like }, { dispatch, getState, rejectWithValue }) => {
    const { success } = like
      ? await getLikeArtApi(artId)
      : await getUnlikeArtApi(artId);

    if (!success) {
      return rejectWithValue();
    } else {
      dispatch(setLikes(selectLikes(getState()) + (like ? 1 : -1)));
      dispatch(setHasLiked(like));
      return true;
    }
  }
);

const initialState = {
  art: {},
  hasLiked: null,
  getArtRequestStatus: "idle",
  getDeleteArtRequestStatus: "idle",
  getLikeArtRequestStatus: "idle",
};

const artOpenSlice = createSlice({
  name: "open",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setLikes: (state, action) => {
      state.art.likes = action.payload;
    },

    setHasLiked: (state, action) => {
      state.hasLiked = action.payload;
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
        state.art = action.payload.art;
        state.hasLiked = action.payload.hasLiked;
      })
      .addCase(getDeleteArt.pending, (state, action) => {
        state.getDeleteArtRequestStatus = "pending";
      })
      .addCase(getDeleteArt.rejected, (state, action) => {
        state.getDeleteArtRequestStatus = "rejected";
      })
      .addCase(getDeleteArt.fulfilled, (state, action) => {
        state.getDeleteArtRequestStatus = "fulfilled";
      })
      .addCase(getLikeArt.pending, (state, action) => {
        state.getLikeArtRequestStatus = "pending";
      })
      .addCase(getLikeArt.rejected, (state, action) => {
        state.getLikeArtRequestStatus = "rejected";
      })
      .addCase(getLikeArt.fulfilled, (state, action) => {
        state.getLikeArtRequestStatus = "fulfilled";
      });
  },
});

export const { reset, setLikes, setHasLiked } = artOpenSlice.actions;

export default artOpenSlice.reducer;
