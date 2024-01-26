import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { API_URL } from "../../../network/api";

export const authApi = createApi({
  reducerPath: "authApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "api/users/2",
        method: "GET",
      }),
    }),
  }),
  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;
    if (token) {
      // include token in req header
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const { useGetUserDetailsQuery } = authApi;
