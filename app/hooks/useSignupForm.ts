import { useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { useRouter } from 'next/navigation'; 
import { useSignUpMutation } from '../redux/features/apiSlice';
import { setAuthenticated } from '../redux/features/authSlice';
import { ErrorResponse } from "../Types/type";

interface FormData {
  username: string;
  email: string;
  password: string;
}

const useSignupForm = () => {
 const router = useRouter();
 const dispatch=useDispatch();
 const [signUp, { isLoading, isError, isSuccess, error }] = useSignUpMutation();  
 const Error = error as ErrorResponse | undefined;
  const [formData, setFormData] = useState<FormData>({
    username: "",
    email: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await signUp(formData).unwrap();
      toast.success("User Sign Up Successfully");
        const token = response?.token; 
              if (token) {
                  Cookies.set('authToken', token, { expires: 7 });
                  dispatch(setAuthenticated(true));
                  router.push('/');   
     }
    } catch (err) {
      toast.error(Error?.data?.message);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
    Error
  };
};

export default useSignupForm;
