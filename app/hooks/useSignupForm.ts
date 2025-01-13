import { useState } from "react";
import Cookies from 'js-cookie';
import { useSignUpMutation } from '../redux/features/apiSlice';
import { useRouter } from 'next/navigation'; 

interface FormData {
  username: string;
  email: string;
  password: string;
}

const useSignupForm = () => {
 const router = useRouter();
 const [signUp, { isLoading, isError, isSuccess, error }] = useSignUpMutation();  
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
      alert('User signed up successfully');
        const token = response?.token; 
              if (token) {
                  Cookies.set('authToken', token, { expires: 7 });
              }
              router.push('/');
              console.log('response',response);
      router.push('/');
   

    } catch (err) {
      console.error('Error during sign-up:', err);
    }
  };

  return {
    formData,
    handleChange,
    handleSubmit,
  };
};

export default useSignupForm;
