import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  API_URL,
  CREATE_USER,
  DELETE_USER,
  GET_USERS,
  UPDATE_USER,
} from "./../../../network/api";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: API_URL,
  }),
  endpoints: (builder) => ({
    getUserDetails: builder.query({
      query: () => ({
        url: "api/users/4",
        method: "GET",
      }),
    }),

    getUserList: builder.query({
      query: (pageSize) => ({
        url: GET_USERS,
        method: "GET",
        params: {
          page: pageSize,
        },
      }),
      // providesTags: ["userList"],
    }),

    createUser: builder.mutation({
      query: ({ userData }) => ({
        url: CREATE_USER,
        method: "POST",
        body: userData,
      }),

      onQueryStarted({ pageSize, userData }, { dispatch }) {
        dispatch(
          userApi.util.updateQueryData("getUserList", pageSize, (draft) => {
            draft.data.unshift(userData);
          })
        );
      },
      // invalidatesTags: ["userList"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${UPDATE_USER}/${id}`,
        method: "PUT",
        body: data,
      }),

      onQueryStarted({ id, data, pageSize }, { dispatch }) {
        console.log(id, data, pageSize);
        dispatch(
          userApi.util.upsertQueryData("getUserList", pageSize, (draft) => {
            const updatedUserIndex = draft.data.findIndex(
              (user) => user.id === id
            );

            if (updatedUserIndex !== -1) {
              draft.data.splice(updatedUserIndex, 1, { id, ...data });
            }
          })
        );
      },
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${DELETE_USER}/${id}`,
        method: "DELETE",
      }),

      onQueryStarted({ id, pageSize }, { dispatch }) {
        dispatch(
          userApi.util.updateQueryData("getUserList", pageSize, (draft) => {
            const deletedUserIndex = draft.data.findIndex(
              (user) => user.id === id
            );

            if (deletedUserIndex !== -1) {
              draft.data.splice(deletedUserIndex, 1);
            }
          })
        );
      },
    }),
  }),

  prepareHeaders: (headers, { getState }) => {
    const token = getState().auth.userToken;

    if (token) {
      headers.set("authorization", `Bearer ${token}`);
    }
    return headers;
  },
});

export const {
  useGetUserDetailsQuery,
  useGetUserListQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
