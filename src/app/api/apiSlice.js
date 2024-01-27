// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
// import { API_URL } from "./../../network/api";

// export const apiSlice = createApi({
//   reducerPath: "userApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: API_URL,
//   }),
//   prepareHeaders: (headers, { getState }) => {
//     const token = getState().auth.userToken;

//     if (token) {
//       // include token in req header
//       headers.set("authorization", `Bearer ${token}`);
//     }
//     return headers;
//   },
//   tagTypes: [],
//   // eslint-disable-next-line no-unused-vars
//   endpoints: (builder) => {},
// });
