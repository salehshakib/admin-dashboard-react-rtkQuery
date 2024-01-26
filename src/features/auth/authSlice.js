import { createSlice } from "@reduxjs/toolkit";
import { registerUser } from "./authAction";

const initialState = {
  loading: false,
  userInfo: {}, // for user object
  userToken: null, // for storing the JWT
  error: null,
  success: false, // for monitoring the registration process.
};

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // register user
    builder.addCase(registerUser.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    // eslint-disable-next-line no-unused-vars
    builder.addCase(registerUser.fulfilled, (state, { payload }) => {
      state.loading = false;
      state.success = true; // registration successful
      // state.userToken
    });
    builder.addCase(registerUser.rejected, (state, { payload }) => {
      state.loading = false;
      state.error = payload;
    });
  },
});

// export const {} = authSlice.actions;

export default authSlice.reducer;
