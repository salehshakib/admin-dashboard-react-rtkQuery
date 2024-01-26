/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authAction";

const userToken = localStorage.getItem("userToken") ?? null;

const initialState = {
  loading: false,
  userInfo: {}, // user object
  userToken, //jwt
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      // ...logout reducer
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // registration successful
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true;
      // state.userToken
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
