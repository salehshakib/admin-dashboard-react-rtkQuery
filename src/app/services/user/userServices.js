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
          per_page: 600,
        },
      }),
      // providesTags: ["userList"],
    }),

    createUser: builder.mutation({
      query: (data) => ({
        url: CREATE_USER,
        method: "POST",
        body: data,
      }),

      async onQueryStarted(arg, { queryFulfilled, dispatch }) {
        try {
          const { data: user } = await queryFulfilled;

          if (user) {
            dispatch(
              userApi.util.upsertQueryData(
                "getUserList",
                undefined,
                (draft) => console.log(draft.data)
                // draft.data
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
      // invalidatesTags: ["userList"],
    }),

    updateUser: builder.mutation({
      query: ({ id, data }) => ({
        url: `${UPDATE_USER}/${id}`,
        method: "PUT",
        body: data,
      }),

      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        try {
          const { data: user } = await queryFulfilled;

          if (user) {
            dispatch(
              userApi.util.upsertQueryData(
                "getUserList",
                undefined,
                (draft) => {
                  // eslint-disable-next-line eqeqeq
                  const updatedTaskIndex = draft.findIndex(
                    (user) => user.data.id == id
                  );

                  draft.splice(updatedTaskIndex, 1, user);
                }
                // draft.data
              )
            );
          }
        } catch (error) {
          console.log(error);
        }
      },
    }),

    deleteUser: builder.mutation({
      query: ({ id }) => ({
        url: `${DELETE_USER}/${id}`,
        method: "DELETE",
      }),

      async onQueryStarted({ id }, { queryFulfilled, dispatch }) {
        let patchResult = dispatch(
          userApi.util.updateQueryData("getUserList", undefined, (draft) => {
            console.log(draft);
            const deletedTaskIndex = draft.findIndex(
              (user) => user.data.id === id
            );

            draft.splice(deletedTaskIndex, 1);
          })
        );

        await queryFulfilled.catch(() => {
          patchResult.undo();
        });
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
