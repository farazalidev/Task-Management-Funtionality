import { Task } from '@/@types';
import Link from 'next/link';
import React from 'react';


interface TaskComponentProps {
  task: Task;
}

const priorityStyles: Record<string, string> = {
  low: 'bg-green-100 text-green-800',
  medium: 'bg-yellow-100 text-yellow-800',
  high: 'bg-red-100 text-red-800',
};

const statusStyles: Record<string, string> = {
  completed: 'bg-blue-100 text-blue-800',
  pending: 'bg-yellow-100 text-yellow-800',
  'in-progress': 'bg-orange-100 text-orange-800',
};

const TaskComponent: React.FC<TaskComponentProps> = ({ task }) => {
  console.log(task);
  
  return (
      <div className="w-[300px] bg-white h-[300px] rounded-lg p-6 mb-4 col-span-12 lg:col-span-6 xl:col-span-3">
      <Link href={`/task/${task.workspace}/${task._id}`}>
         <h2 className="text-xl font-semibold">{task.title}</h2>
      <p className="text-gray-600">{task.description}</p>
      <p className="mt-2">
        <strong>Assigned To:</strong> 
        <span className={`font-semibold ml-1 ${priorityStyles[task.priority]}`}>
          {`${task.assinged_to.first_name} ${task.assinged_to.last_name}`}
        </span>
      </p>
      <p className="mt-2">
        <strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}
      </p>
      <p className={`mt-2 p-1 rounded ${priorityStyles[task.priority]}`}>
        <strong>Priority:</strong> <span>{task.priority}</span>
      </p>
       <p className={`mt-2 p-1 rounded ${statusStyles[task.status]}`}>
        <strong>Status:</strong> <span>{task.status}</span>
      </p></Link> 
      </div>
  );
};

export default TaskComponent;
