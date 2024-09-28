"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input/InputField'; 
import { RegisterUser } from '@/utils/api';
import Link from 'next/link';
import Button from '../button/Button';

const registrationSchema = z.object({
  email: z.string().email('Invalid email address').min(1, 'Email is required'),
  first_name: z.string().min(1, 'First name is required'),
  last_name: z.string().min(1, 'Last name is required'),
  password: z.string().min(8, 'Password must be at least 8 characters long'),
});

export type RegistrationFormInputs = z.infer<typeof registrationSchema>;

const RegistrationForm: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<RegistrationFormInputs>({
    resolver: zodResolver(registrationSchema),
  });

  const onSubmit: SubmitHandler<RegistrationFormInputs> = async (data) => {
    setLoading(true);
    setSubmitError(null); // Reset error before new submission
    try {
      await RegisterUser(data);
      window.location.href = '/myworkspaces';
    } catch (error: any) {
      setSubmitError(error?.response?.data.message || error?.message || 'An unexpected error occurred.'); // Set error message
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col gap-4" autoComplete='off'>
      <h2 className="text-xl font-semibold mb-4">Register</h2>

      {submitError && <p className="text-red-600">{submitError}</p>} {/* Show submission error */}

      <InputField
        type="email"
        placeholder="Email"
        {...register('email')}
      />
      {errors.email && <p className="text-red-600">{errors.email.message}</p>}

      <InputField
        type="text"
        placeholder="First Name"
        {...register('first_name')}
      />
      {errors.first_name && <p className="text-red-600">{errors.first_name.message}</p>}

      <InputField
        type="text"
        placeholder="Last Name"
        {...register('last_name')}
      />
      {errors.last_name && <p className="text-red-600">{errors.last_name.message}</p>}

      <InputField
        type="password"
        placeholder="Password"
        {...register('password')}
      />
      {errors.password && <p className="text-red-600">{errors.password.message}</p>}

      <Button
        type="submit"
        label="Register"
        loading={loading}
        className={`${!isValid ? 'opacity-50 cursor-not-allowed' : ''}`}
        disabled={!isValid}
      />

      <Link href="/login" className="text-blue-500 text-center mt-4">
        Already have an account? Login
      </Link>
    </form>
  );
};

export default RegistrationForm;
/* eslint-disable @typescript-eslint/no-explicit-any */
