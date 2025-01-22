import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import postsService from "./postsService";

const initialState = {
  posts: [],
  isLoading: false,
  post: {},
};

export const getAll = createAsyncThunk("posts/getAll", async () => {
  try {
    return await postsService.getAll();
  } catch (error) {
    console.error(error);
  }
});

export const getById = createAsyncThunk("posts/getById", async (_id) => {
  try {
    return await postsService.getById(_id);
  } catch (error) {
    console.error(error);
  }
});
export const getPostByTitle = createAsyncThunk(
  "posts/getPostByTitle",
  async (title) => {
    try {
      return await postsService.getPostByTitle(title);
    } catch (error) {
      console.error(error);
    }
  }
);
export const like = createAsyncThunk("posts/like", async (_id) => {
  try {
    return await postsService.like(_id);
  } catch (error) {
    console.error(error);
  }
});

export const unlike = createAsyncThunk("posts/unlike", async (_id) => {
  try {
    return await postsService.unlike(_id);
  } catch (error) {
    console.error(error);
  }
});

export const create = createAsyncThunk("posts/create", async (postData) => {
  try {
    console.log(postData);
    return await postsService.create(postData);
  } catch (error) {
    console.error(error);
  }
});

export const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getAll.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(getAll.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getById.fulfilled, (state, action) => {
        state.post = action.payload;
      })
      .addCase(getPostByTitle.fulfilled, (state, action) => {
        state.posts = action.payload;
      })
      .addCase(like.fulfilled, (state, action) => {
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        if (state.post._id === action.payload._id) {
          state.post = action.payload;
        }
      })
      .addCase(unlike.fulfilled, (state, action) => {
        console.log("Unlike Payload:", action.payload);
        state.posts = state.posts.map((post) =>
          post._id === action.payload._id ? action.payload : post
        );
        if (state.post._id === action.payload._id) {
          state.post = action.payload;
        }
      })
      .addCase(create.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(create.fulfilled, (state, action) => {
        state.posts.push(action.payload);
        state.isLoading = false;
      })
      .addCase(create.rejected, (state, action) => {
        console.error("Create post failed:", action.error.message);

        state.isLoading = false;
      });
  },
});

export const { reset } = postsSlice.actions;
export default postsSlice.reducer;
