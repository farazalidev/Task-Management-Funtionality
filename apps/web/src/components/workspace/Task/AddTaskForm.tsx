/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import InputField from '@/components/input/InputField';
import { AddTask, GetWorkspaceUsers } from '@/utils/api';
import handleApiError from '@/utils/handleApiError';
import useSWR from 'swr';
import { useRouter } from 'next/navigation';
import { User } from '@/@types';

const taskSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(1, 'Description is required'),
  assigned_to_email: z.string().email('Invalid email address'),
  due_date: z.string().min(1, 'Due date is required').refine(date => !isNaN(new Date(date).getTime()), {
    message: 'Invalid date format',
  }),
  priority: z.enum(['low', 'medium', 'high']),
  status: z.enum(['completed', 'pending', 'in-progress'])
});

export type TaskFormInputs = z.infer<typeof taskSchema>;

interface WorkspaceUser {
  user: User
}

const AddTaskForm: React.FC<{ workspace_id: string }> = ({ workspace_id }) => {
  const router = useRouter()
  const { data } = useSWR(workspace_id, GetWorkspaceUsers);

  const {
    register,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<TaskFormInputs>({
    resolver: zodResolver(taskSchema),
    mode: 'onChange',
  });

  const onSubmit: SubmitHandler<TaskFormInputs> = async (data) => {
    const taskData = { ...data, workspace_id };
    try {
      await AddTask(taskData);
      router.push(`/ws/${workspace_id}`)
    } catch (error: any) {
      handleApiError(error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto bg-white shadow-lg rounded-lg p-6 mb-4 flex flex-col gap-2">
      <h2 className="text-xl font-semibold mb-4">Add New Task</h2>

      <InputField
        type="text"
        placeholder="Title"
        {...register('title')}
      />
      {errors.title && <p className="text-red-600">{errors.title.message}</p>}

      <InputField
        type="text"
        placeholder="Description"
        {...register('description')}
      />
      {errors.description && <p className="text-red-600">{errors.description.message}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Assign To</label>
        <select
          {...register('assigned_to_email')}
          className="border-2 border-black rounded-none px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black"
          defaultValue=""
        >
          {!data?.data?.users?.length ? (
            <option value="" disabled>No users available</option>
          ) : (
            <>
              <option value="" disabled>Select a user</option>
              {data?.data.users?.map((workspaceUser: WorkspaceUser) => (
                <option key={workspaceUser.user._id} value={workspaceUser.user.email}>
                  {workspaceUser.user.first_name} {workspaceUser.user.last_name} ({workspaceUser.user.email})
                </option>
              ))}
            </>
          )}
        </select>
        {errors.assigned_to_email && <p className="text-red-600">{errors.assigned_to_email.message}</p>}
      </div>

      <InputField
        type="datetime-local"
        {...register('due_date')}
      />
      {errors.due_date && <p className="text-red-600">{errors.due_date.message}</p>}

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Priority</label>
        <select {...register('priority')} className="border-2 border-black rounded-none px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black">
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
        {errors.priority && <p className="text-red-600">{errors.priority.message}</p>}
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 mb-2">Status</label>
        <select {...register('status')} className="border-2 border-black rounded-none px-4 py-2 w-full focus:outline-none focus:ring-2 focus:ring-black">
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
        </select>
        {errors.status && <p className="text-red-600">{errors.status.message}</p>}
      </div>

      <button
        type="submit"
        className={`bg-blue-500 text-white p-2 rounded-lg w-full ${(!isValid || !data?.data?.users?.length) && 'opacity-50 cursor-not-allowed'}`}
        disabled={!isValid || !data?.data?.users?.length}
      >
        Add Task
      </button>
    </form>
  );
};

export default AddTaskForm;
