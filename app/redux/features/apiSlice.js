import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers, { getState }) => {
      const token = Cookies.get('authToken');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['TaskList', 'Task'],
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/auth/signup',
        method: 'POST',
        body: userData,
      }),
      // Invalidate task cache on sign-up
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags([{ type: 'TaskList' }]));
        } catch (error) {
          // Type guard to check if the error is an instance of Error
          if (error instanceof Error) {
            console.error('Error during sign-up:', error.message);
          } else {
            console.error('Unknown error during sign-up');
          }
        }
      },
    }),
    signIn: builder.mutation({
      query: (userData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userData,
      }),
      // Invalidate the task cache once the user logs in
      async onQueryStarted(_, { dispatch, queryFulfilled }) {
        try {
          await queryFulfilled;
          dispatch(apiSlice.util.invalidateTags([{ type: 'TaskList' }]));
        } catch (error) {
           console.log("ERROR :: ");
          if (error instanceof Error) {
            console.log('Error during sign-in:', error.message);
          } else {
            console.log('Unknown error during sign-in');
          }
        }
      },
    }),
    getTasks: builder.query({
      query: (queryParams) => {
        let url = '/tasks';
        if (queryParams) {
          const params = new URLSearchParams();
          if (queryParams.title) params.append('title', queryParams.title);
          if (queryParams.description) params.append('description', queryParams.description);
          if (params.toString()) {
            url += `?${params.toString()}`;
          }
        }
        return { url };
      },
      providesTags: (result, error, arg) => {
        const tags = [{ type: 'TaskList' }];
        // Optionally add query-specific tags if necessary
        if (arg) {
          const queryKey = `TaskList:${JSON.stringify(arg)}`;
          tags.push({ type: 'TaskList', id: queryKey });
        }
        return tags;
      },
    }),
    createTask: builder.mutation({
      query: (userData) => ({
        url: '/tasks',
        method: 'POST',
        body: userData,
      }),
      invalidatesTags: [{ type: 'TaskList' }],
    }),
    updateTask: builder.mutation({
      query: ({ id, task }) => ({
        url: `/tasks/${id}`,
        method: 'PUT',
        body: task,
      }),
      invalidatesTags: [{ type: 'TaskList' }],
    }),
    deleteTask: builder.mutation({
      query: (id) => ({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: [{ type: 'TaskList' }],
    }),
  }),
});

export const {
  useGetDataQuery,
  useSignUpMutation,
  useSignInMutation,
  useGetTasksQuery,
  useCreateTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;
