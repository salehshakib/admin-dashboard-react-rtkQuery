import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, LOGIN, REGISTER } from "../../network/api";

export const userLogin = createAsyncThunk(
  "auth/login",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.post(
        `${API_URL}${LOGIN}`,
        { email, password },
        config
      );
      localStorage.setItem("userToken", data.userToken);
      return data;
    } catch (error) {
      console.log(error);

      // return custom error message from API if any
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const registerUser = createAsyncThunk(
  "auth/register",
  async ({ name, email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(
        `${API_URL}${REGISTER}`,
        { name, email, password },
        config
      );
    } catch (error) {
      console.log(error);
      // return custom error message from backend if present
      if (error.response && error.response.data.message) {
        return rejectWithValue(error.response.data.message);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
