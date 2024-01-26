import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { API_URL, LOGIN, REGISTER } from "../../network/api";

const userLogin = createAsyncThunk(
  "user/login",
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
      localStorage.setItem("userToken", data?.token);
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

const registerUser = createAsyncThunk(
  "auth/register",
  async ({ email, password }, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      await axios.post(`${API_URL}${REGISTER}`, { email, password }, config);
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

const getUserDetails = createAsyncThunk(
  "user/getDetails",
  async ({ rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const { data } = await axios.get(`${API_URL}${LOGIN}`, config);
      localStorage.setItem("userToken", data?.token);
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

export { userLogin, getUserDetails, registerUser };
