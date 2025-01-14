'use client';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie'; // A lightweight library to handle cookies
import { setAuthenticated } from '../redux/features/authSlice'; // Import the action from authSlice

const useLogout = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const logout = () => {
    // Remove the authentication token from cookies
    Cookies.remove('authToken');

    // Update the Redux state
    dispatch(setAuthenticated(false));

    // Redirect to the signin page
    router.push('/signin');
  };

  return logout;
};

export default useLogout;
