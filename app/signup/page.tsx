'use client';
import React from "react";
import InputField from "../components/InputField";
import Link from "next/link";
import useSignupForm from "../hooks/useSignupForm"; 

const Signup: React.FC = () => {
  const { formData, handleChange, handleSubmit ,Error } = useSignupForm();

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="bg-white p-10 rounded-xl shadow-2xl border border-gray-200 w-11/12 max-w-lg">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Create an Account</h1>
        <p className="text-center text-gray-600 mb-8">
          Start your journey with us by creating an account.
        </p>
        <form onSubmit={handleSubmit} className="space-y-6">
          <InputField
            label="Username"
            type="text"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
          />
          <InputField
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
          />
          <InputField
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
          />
           { Error &&
             <p className="text-center text-red-500 mb-8">
             {Error?.data?.message}
           </p>
        } 
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full bg-gradient-to-r from-blue-500 to-teal-400 text-white font-semibold py-3 rounded-lg shadow-md hover:from-blue-600 hover:to-teal-500 hover:shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              Sign Up
            </button>
          </div>
        </form>

        {/* Footer Section */}
        <p className="text-center text-sm text-gray-500 mt-8">
          Already have an account?{" "}
          <Link href="/login" className="text-blue-500 font-medium hover:underline">
            Sign In
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
