// hooks/useAuth.js
import { useDispatch } from 'react-redux';
import Cookies from 'js-cookie';
import { setAuthenticated } from '../redux/features/authSlice';

const useAuth = () => {
  const dispatch = useDispatch();

  const checkAuthentication = () => {
    const token = Cookies.get('authToken');
    if (token) {
      dispatch(setAuthenticated(true)); 
    } else {
      dispatch(setAuthenticated(false)); 
    }
  };

  return {
    checkAuthentication,
  };
};

export default useAuth;
