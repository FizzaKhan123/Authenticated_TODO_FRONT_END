import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import Cookies from 'js-cookie';

export const apiSlice = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:5000/api',
    prepareHeaders: (headers) => {
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
    }),
    signIn: builder.mutation({
      query: (userData) => ({
        url: '/auth/signin',
        method: 'POST',
        body: userData,
      }),
    }),
    getTasks: builder.query({
      query: () => '/tasks',
      providesTags: ['TaskList'],
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
      // Invalidate TaskList to refetch after deletion
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
