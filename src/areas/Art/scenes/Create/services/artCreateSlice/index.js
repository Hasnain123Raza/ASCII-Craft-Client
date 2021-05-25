import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import artSchema from "../artSchema.js";
import { postCreateArtApi } from "./api.js";
import { resetAuthentication } from "../../../../../../services/authenticatedSlice";

export const postCreateArt = createAsyncThunk(
  "create/postCreateArt",
  async (art, { dispatch, rejectWithValue }) => {
    const validationResult = artSchema.validate(art, { abortEarly: false });

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
      const data = await postCreateArtApi(art);

      if (data.success) {
        return data.payload;
      } else {
        if (data.error.unauthenticated) {
          dispatch(resetAuthentication());
          return rejectWithValue("preventStateUpdates");
        }
        return rejectWithValue();
      }
    }
  }
);

const initialState = {
  art: {
    title: "",
    description: "",
    content: "",
  },
  responseArt: null,
  validationErrors: [],
  postCreateArtRequestStatus: "idle",
};

export const artCreateSlice = createSlice({
  name: "create",
  initialState,
  reducers: {
    reset: (state, action) => {
      return { ...initialState };
    },

    resetArt: (state, action) => {
      state.art = { ...initialState.art };
    },

    setTitle: (state, action) => {
      state.art.title = action.payload;
    },

    setDescription: (state, action) => {
      state.art.description = action.payload;
    },

    setContent: (state, action) => {
      state.art.content = action.payload;
    },

    setValidationErrors: (state, action) => {
      state.validationErrors = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(postCreateArt.pending, (state, action) => {
        state.postCreateArtRequestStatus = "pending";
      })
      .addCase(postCreateArt.rejected, (state, action) => {
        if (action.payload !== "preventStateUpdates")
          state.postCreateArtRequestStatus = "rejected";
      })
      .addCase(postCreateArt.fulfilled, (state, action) => {
        state.responseArt = action.payload;
        state.postCreateArtRequestStatus = "fulfilled";
      });
  },
});

export const {
  reset,
  resetArt,
  setTitle,
  setDescription,
  setContent,
  setValidationErrors,
} = artCreateSlice.actions;

export default artCreateSlice.reducer;
