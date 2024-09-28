"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input/InputField';
import handleApiError from '@/utils/handleApiError';
import { AddUser } from '@/utils/api';
import { useRouter } from 'next/navigation';

const userSchema = z.object({
  user_email: z.string().email('Invalid email address').min(1, 'Email is required'),
});

type UserFormInputs = z.infer<typeof userSchema>;

const AddUserForm: React.FC<{ workspace_id: string }> = ({ workspace_id }) => {

  const router = useRouter()

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserFormInputs>({
    resolver: zodResolver(userSchema),
  });

  const onSubmit: SubmitHandler<UserFormInputs> = async (data) => {
    try {
      await AddUser({ user_email: data.user_email, workspace_id })
      router.push(`/ws/${workspace_id}`)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
      handleApiError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-4">Add User to Workspace</h2>

      <InputField
        type="email"
        placeholder="User Email"
        {...register('user_email')}
      />
      {errors.user_email && <p className="text-red-600">{errors.user_email.message}</p>}

      <button type="submit" className="bg-blue-500 text-white p-2 rounded-lg w-full">
        Add User
      </button>
    </form>
  );
};

export default AddUserForm;
