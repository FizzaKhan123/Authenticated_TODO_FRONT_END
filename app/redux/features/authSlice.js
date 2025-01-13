// features/authSlice.js
import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  isAuthenticated: !!Cookies.get('authToken'), // check if the token exists in cookies
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthenticated: (state, action) => {
      state.isAuthenticated = action.payload;
    },
  },
});

export const { setAuthenticated } = authSlice.actions;
export default authSlice.reducer;
