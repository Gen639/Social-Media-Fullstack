import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import commentsService from "./commentsService";

const initialState = {
  comments: [],
  isLoading: false,
  comment: {},
};

export const getAll = createAsyncThunk("comments/getAll", async (id) => {
  try {
    return await commentsService.getAll(id);
  } catch (error) {
    console.error(error);
  }
});

export const commentsSlice = createSlice({
  name: "comments",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getAll.fulfilled, (state, action) => {
        state.comments = action.payload;
      })
      .addCase(getAll.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commentsSlice.reducer;
