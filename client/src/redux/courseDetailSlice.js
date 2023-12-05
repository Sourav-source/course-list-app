import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getCourseDetails } from "../api";

export const getCourseDetailsThunk = createAsyncThunk(
  "course/getCourseDetails",
  async (courseId) => {
    try {
      const response = await getCourseDetails(courseId);
      if (response.status !== 200) {
        throw new Error(response);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const courseDetailSlice = createSlice({
  name: "courseDetail",
  initialState: {
    status: "idle",
    course: {},
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCourseDetailsThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getCourseDetailsThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.course = action.payload.data;
      })
      .addCase(getCourseDetailsThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default courseDetailSlice.reducer;
