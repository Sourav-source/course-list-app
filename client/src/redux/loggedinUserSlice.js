import { createSlice } from "@reduxjs/toolkit";

const loggedInUserSlice = createSlice({
  name: "loggedInUser",
  initialState: {
    status: "idle",
    user: null,
    error: null,
  },
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
      state.status = "succeeded";
      state.error = null;
    },
    clearUser: (state) => {
      state.user = null;
      state.status = "idle";
      state.error = null;
    },
  },
});

export const { setUser, clearUser } = loggedInUserSlice.actions;

export default loggedInUserSlice.reducer;