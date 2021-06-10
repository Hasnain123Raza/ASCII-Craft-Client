import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { getArtCountApi, getSimplifiedArtsApi } from "./api.js";
import { selectArtCount, selectCurrentPage } from "./selectors.js";

export const getArtCount = createAsyncThunk(
  "browse/getArtCount",
  async (selectors, { rejectWithValue }) => {
    const { success, payload } = await getArtCountApi(selectors);
    if (!success) {
      return rejectWithValue();
    } else {
      return payload;
    }
  }
);

export const getSimplifiedArts = createAsyncThunk(
  "browse/getSimplifiedArts",
  async ({ pageOffset, pageSize, selectors }, { rejectWithValue }) => {
    const { success, payload } = await getSimplifiedArtsApi(
      pageOffset,
      pageSize,
      selectors
    );
    if (!success) {
      return rejectWithValue();
    } else {
      return payload;
    }
  }
);

export const loadResources = createAsyncThunk(
  "browse/loadResources",
  async (
    { pageOffset, pageSize, queriedPage, selectors },
    { getState, dispatch }
  ) => {
    const hasLoadedArtCount = selectArtCount(getState()) !== -1;
    if (!hasLoadedArtCount) await dispatch(getArtCount(selectors));

    const isPageConflict = selectCurrentPage(getState()) !== queriedPage;
    if (!isPageConflict)
      await dispatch(getSimplifiedArts({ pageOffset, pageSize, selectors }));
  }
);

const initialState = {
  artCount: -1,
  getArtCountRequestStatus: "idle",
  simplifiedArts: [],
  getSimplifiedArtsRequestStatus: "idle",
  currentPage: 1,
};

const artBrowseSlice = createSlice({
  name: "browse",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    setCurrentPage: (state, action) => {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getArtCount.pending, (state, action) => {
        state.getArtCountRequestStatus = "pending";
      })
      .addCase(getArtCount.rejected, (state, action) => {
        state.getArtCountRequestStatus = "rejected";
      })
      .addCase(getArtCount.fulfilled, (state, action) => {
        state.getArtCountRequestStatus = "fulfilled";
        state.artCount = action.payload;
      })
      .addCase(getSimplifiedArts.pending, (state, action) => {
        state.getSimplifiedArtsRequestStatus = "pending";
      })
      .addCase(getSimplifiedArts.rejected, (state, action) => {
        state.getSimplifiedArtsRequestStatus = "rejected";
      })
      .addCase(getSimplifiedArts.fulfilled, (state, action) => {
        state.getSimplifiedArtsRequestStatus = "fulfilled";
        state.simplifiedArts = action.payload;
      });
  },
});

export const { reset, setCurrentPage } = artBrowseSlice.actions;

export default artBrowseSlice.reducer;
