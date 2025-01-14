import { useState } from "react";
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useDispatch } from 'react-redux';
import { setAuthenticated } from '../redux/features/authSlice';
import {useSignInMutation} from '../redux/features/apiSlice';
import { ErrorResponse } from "../Types/type";

const useLoginForm = () => {
  const router = useRouter();
  const dispatch=useDispatch();
  const [signIn, { isLoading, isError, isSuccess, error }] =useSignInMutation();

  const Error = error as ErrorResponse | undefined;
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit =async (e: React.FormEvent) => {
    e.preventDefault();
    try {
        const response = await signIn(formData).unwrap();
        toast.success("User Sign In Successfully");
        const token = response?.token; 
        if (token) {
            Cookies.set('authToken', token, { expires: 7 });
            dispatch(setAuthenticated(true)); 
        }
        router.push('/');

  
      } catch (err) {
        const error = err as ErrorResponse;
        console.log("sign in error",err);
        toast.error(error?.data?.message);
      }
  };

  return { formData, handleChange, handleSubmit,Error };
};

export default useLoginForm;
