/* eslint-disable no-unused-vars */
import { createSlice } from "@reduxjs/toolkit";
import { registerUser, userLogin } from "./authActions";

// initialize userToken from local storage
const userToken = localStorage.getItem("userToken") ?? null;

const initialState = {
  loading: false,
  userInfo: null, // user object
  userToken, //jwt
  error: null,
  success: false,
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      localStorage.removeItem("userToken");
      state.loading = false;
      state.userInfo = null;
      state.userToken = null;
      state.error = null;
    },
    setCredentials: (state, { payload }) => {
      state.userInfo = payload;
    },
  },
  extraReducers: (builder) => {
    // login user
    builder
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.userToken = payload.token;
      })
      .addCase(userLogin.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
    // register user
    builder
      .addCase(registerUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.loading = false;
        state.error = payload;
      });

    // getUserDetails reducer ...
    // builder
    //   .addCase(getUserDetails.pending, (state) => {
    //     state.loading = true;
    //     state.error = null;
    //   })
    //   .addCase(getUserDetails.fulfilled, (state, { payload }) => {
    //     state.loading = false;
    //     state.success = true;
    //     state.userInfo = payload;
    //   })
    //   .addCase(getUserDetails.rejected, (state, { payload }) => {
    //     state.loading = false;
    //     state.error = payload;
    //   });
  },
});

export const { logout, setCredentials } = authSlice.actions;
export default authSlice.reducer;
