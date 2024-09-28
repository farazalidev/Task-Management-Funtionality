"use client";
import React from 'react';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '../input/InputField';
import Button from '../button/Button';
import { AddWorkspaceMutation } from '@/utils/api';
import handleApiError from '@/utils/handleApiError';
import { useRouter } from 'next/navigation';

const workspaceSchema = z.object({
  name: z.string().min(1, 'Workspace name is required').max(100, 'Name is too long'),
});

export type WorkspaceFormData = z.infer<typeof workspaceSchema>;

const AddWorkspaceForm: React.FC = () => {
  const router = useRouter()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<WorkspaceFormData>({
    resolver: zodResolver(workspaceSchema),
  });

  const onSubmit = async (data: WorkspaceFormData) => {
    try {
      await AddWorkspaceMutation(data);
    router.push("/myworkspaces")
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
    handleApiError(error)
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Workspace Name
        </label>
        <InputField
          id="name"
          {...register('name')}
          placeholder="Enter workspace name"
          className={`mt-1 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
        />
        {errors.name && <span className="text-red-500 text-sm">{errors.name.message}</span>}
      </div>

      <Button
        label="Add Workspace"
        type="submit"
      />
    </form>
  );
};

export default AddWorkspaceForm;
