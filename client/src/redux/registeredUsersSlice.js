import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllUsers } from "../api";

export const getAllUsersThunk = createAsyncThunk(
  "user/getAllUsers",
  async () => {
    try {
      const response = await getAllUsers();
      if (response.status !== 200) {
        throw new Error(response);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const userSlice = createSlice({
  name: "user",
  initialState: {
    status: "idle",
    users: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllUsersThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllUsersThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.users = action.payload.data;
      })
      .addCase(getAllUsersThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default userSlice.reducer;
