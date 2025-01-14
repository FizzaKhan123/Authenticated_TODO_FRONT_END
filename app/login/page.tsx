'use client';
import React from "react";
import InputField from "../components/InputField";
import Link from "next/link";
import useLoginForm from "../hooks/useLoginForm";
const Login: React.FC = () => {
  const { formData, handleChange, handleSubmit ,Error } = useLoginForm(); 
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200 w-11/12 max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Welcome Back</h1>
        <p className="text-center text-gray-600 mb-8">
          Log in to your account to continue.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Username or Email"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username or email"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
        {Error &&
             <p className="text-center text-red-500 mb-8">
             {Error?.data?.message}
           </p>
        } 

          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-teal-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Log In
            </button>
          </div>
        </form>
        <p className="text-center text-sm text-gray-500 mt-8">
          Don't have an account?{" "}
          <Link href="/signup" className="text-blue-500 font-medium hover:underline">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;
