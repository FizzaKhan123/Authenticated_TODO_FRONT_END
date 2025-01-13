import { useState } from "react";
import Cookies from 'js-cookie';
import { useRouter } from 'next/navigation';
import {useSignInMutation} from '../redux/features/apiSlice';
const useLoginForm = () => {
  const router = useRouter();
  const [signIn, { isLoading, isError, isSuccess, error }] =useSignInMutation();
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
        alert('User signed up successfully');
        const token = response?.token; 
        if (token) {
            Cookies.set('authToken', token, { expires: 7 });
        }
        router.push('/');
        console.log('response',response);

  
      } catch (err) {
        console.error('Error during sign-up:', err);
      }
  };

  return { formData, handleChange, handleSubmit };
};

export default useLoginForm;
