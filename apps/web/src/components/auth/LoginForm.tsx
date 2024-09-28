"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input/InputField'; 
import { LoginUser } from '@/utils/api'; 
import Link from 'next/link';
import Button from '../button/Button';

const loginSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type LoginFormInputs = z.infer<typeof loginSchema>;

const LoginForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<LoginFormInputs>({
    resolver: zodResolver(loginSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<LoginFormInputs> = async (data) => {
    setLoading(true);
    setSubmitError(null); // Reset error before new submission
    try {
      await LoginUser(data);
      window.location.href = '/myworkspaces';
    } catch (error: any) {
      console.log(error);
      
      setSubmitError(error?.response?.data.message || error?.message || 'An unexpected error occurred.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col gap-4">
      <h2 className="text-xl font-semibold mb-4">Login</h2>

      {submitError && <p className="text-red-600">{submitError}</p>} {/* Show submission error */}

      <InputField
        type="email"
        placeholder="Email"
        {...register('email')}
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}

      <InputField
        type="password"
        placeholder="Password"
        {...register('password')}
      />
      {errors.password && <p className="text-red-600">{errors.password.message}</p>}

      <Button
        type="submit"
        label="Login"
        loading={loading}
        className={`${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isValid}
      />

      <Link href="/register" className="text-blue-500 text-center mt-4">
       Register 
      </Link>
    </form>
  );
};

export default LoginForm;
/* eslint-disable @typescript-eslint/no-explicit-any */
