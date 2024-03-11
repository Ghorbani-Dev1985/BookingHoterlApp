import { Email, Visibility } from '@mui/icons-material';
import { CircularProgress } from '@mui/material';
import React, { useState } from 'react'
import { useForm } from "react-hook-form";

const Login = () => {
    const [showPassword, setShowPassword] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
        isDirty,
        isValid,
        formState,
      } = useForm(
        {
          mode: "all",
        },
        {
          defaultValues: {
            Email: '',
            Password: '',
          },
        }
      );
  return (
    <section className='container'>
        <div className='flex-center min-h-screen'>
          <div className='w-full max-w-lg flex flex-col items-center gap-6 p-5 border border-gray-600 rounded-lg'>
        <h2 className='font-MorabbaBold text-3xl'>Login</h2>
        <form className='w-full'>
               {/* Email */}
          <div className="relative">
              <Email className="absolute right-3 sm:right-4 top-2 text-gray-600" />
              <input
                type="text"
                {...register("Email", {
                  required: "Email is required",
                  minLength: {
                    value: 8,
                    message: "Please enter at least 8 characters",
                  },
                  maxLength: {
                    value: 25,
                    message: "Please enter a maximum of 25 characters",
                  },
                  pattern: {
                    value: /[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{8,25}/g,
                    message: "Please enter a valid email address",
                  },
                })}
                className={`${
                  errors.Email && "border border-rose-500"
                } outline-none`}
                placeholder="Email*"
              />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.Email && errors.Email.message}
            </span>
            {/* Password */}
       <div className="relative">
              <input
                {...register("Password", {
                  required: "Password is required",
                  minLength: {
                    value: 8,
                    message: "Please enter at least 8 characters",
                  },
                  maxLength: {
                    value: 15,
                    message: "Please enter a maximum of 15 characters",
                  },
                  pattern: {
                    value: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,15}$/g,
                    message: "Please enter a valid password",
                  },
                })}
                type={showPassword ? "text" : "password"}
                className={`${
                  errors.Password && "border border-rose-500"
                } outline-none pl-9 sm:pl-12`}
                placeholder="Password*"
              />
               <Visibility
                  onClick={() => setShowPassword((prev) => !prev)}
                  className="left-3 sm:left-4 cursor-pointer"
                />
            </div>
            <span className="block text-rose-500 text-sm my-2">
              {errors.Password && errors.Password.message}
            </span>
            <button
            type="submit"
            className="bg-orange-400 hover:bg-orange-600 transition-colors h-12 sm:button-lg rounded-xl button-primary mt-2.5 sm:mt-4 w-full disabled:bg-slate-500 disabled:opacity-50 disabled:cursor-text"
            disabled={(!formState.isValid || isLoading)}
            >
           {isLoading ? <CircularProgress className='text-white !size-6'/> : "Add New Bookmark"} 
          </button>
        </form>
          </div>
        </div>
    </section>
  )
}

export default Login