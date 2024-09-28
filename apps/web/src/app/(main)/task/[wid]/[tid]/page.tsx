"use client";

import CircleLoader from '@/components/status/CirlceLoader';
import DisplayError from '@/components/status/Error';
import TaskComponent from '@/components/workspace/Task/Task';
import { GetTaskDetails, AddCommentToTask } from '@/utils/api';
import React from 'react';
import useSWR from 'swr';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import Button from '@/components/button/Button';
import InputField from '@/components/input/InputField';
import { TaskDetailsResponse } from '@/@types';

interface PageProps {
  params: {
    wid: string;
    tid: string;
  };
}

const commentSchema = z.object({
  comment: z.string().min(1, { message: 'Comment is required' }),
});

type CommentFormData = z.infer<typeof commentSchema>;

const Page: React.FC<PageProps> = ({ params }) => {
  const { data, isLoading, error, mutate } = useSWR<TaskDetailsResponse>(
    [params.tid, params.wid],
    ([task_id, workspace_id]) => GetTaskDetails(task_id, workspace_id as string)
  );

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm<CommentFormData>({
    resolver: zodResolver(commentSchema),
  });

  if (error) {
    return <DisplayError errorMessage={error.message} />;
  }

  if (isLoading) {
    return <CircleLoader />;
  }

  const { task, comments } = data || {};

  const onSubmit = async (data: CommentFormData) => {
    try {
      await AddCommentToTask(params.tid, data.comment, params.wid);
      mutate(); 
      reset();  
    } catch (error) {
      console.error('Failed to submit comment:', error);
    }
  };

  return (
    <div className="p-6">
      {task && <TaskComponent task={task} />}
      
      <div className="mt-8">
        <h3 className="text-xl font-semibold">Comments</h3>
        {comments && comments.length > 0 ? (
          <ul className="mt-4">
            {comments.map((comment) => (
              <li key={comment._id} className="mb-4">
                <p className="text-gray-700">{comment.comment}</p>
                <p className="text-sm text-gray-500">
                  Commented by: {comment.by.first_name} {comment.by.last_name}
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No comments yet.</p>
        )}

        <form onSubmit={handleSubmit(onSubmit)} className="mt-4">
          <InputField
            {...register('comment')}
            placeholder="Add a comment..."
            className="mb-2"
          />
          {errors.comment && (
            <p className="text-red-500 text-sm">{errors.comment.message}</p>
          )}
          <Button label="Add Comment" loading={isSubmitting} />
        </form>
      </div>
    </div>
  );
};

export default Page;
