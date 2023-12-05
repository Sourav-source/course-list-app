import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { getAllCourses, getSearchedCourses } from "../api";

export const getAllCoursesThunk = createAsyncThunk(
  "course/getAllCourses",
  async () => {
    try {
      const response = await getAllCourses();
      if (response.status !== 200) {
        throw new Error(response);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

export const getSearchedCoursesThunk = createAsyncThunk(
  "course/getSearchedCourses",
  async (query) => {
    try {
      const response = await getSearchedCourses(query);
      console.log(response)
      if (response.status !== 200) {
        throw new Error(response);
      }
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }
);

const courseSlice = createSlice({
  name: "course",
  initialState: {
    status: "idle",
    courses: [],
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getAllCoursesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getAllCoursesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload.data;
      })
      .addCase(getAllCoursesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
    builder
      .addCase(getSearchedCoursesThunk.pending, (state) => {
        state.status = "loading";
      })
      .addCase(getSearchedCoursesThunk.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.courses = action.payload.data;
      })
      .addCase(getSearchedCoursesThunk.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      });
  },
});

export default courseSlice.reducer;
