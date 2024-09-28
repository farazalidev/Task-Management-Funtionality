import React from 'react';

interface Task {
  _id: string;
  title: string;
  description: string;
  assinged_to: {
    first_name: string;
    last_name:string
  }; 
  due_date: string;
  status: string;
  priority: 'low' | 'medium' | 'high';
  workspace: string;
}

interface TaskReportProps {
  tasksData: {
    tasks: Task[];
    totalTasks: number;
    completedTasks: number;
    priorityDistribution: {
      low: number;
      medium: number;
      high: number;
    };
    completedPercentage: number;
  };
}

const TaskReport: React.FC<TaskReportProps> = ({ tasksData }) => {
  const { tasks, totalTasks, completedTasks, priorityDistribution, completedPercentage } = tasksData;

  return (
    <div className="p-6 bg-white shadow-md rounded-md">
      <h2 className="text-2xl font-semibold mb-4">Task Reports</h2>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Overview</h3>
        <p><strong>Total Tasks:</strong> {totalTasks}</p>
        <p><strong>Completed Tasks:</strong> {completedTasks}</p>
        <p><strong>Completed Percentage:</strong> {completedPercentage}%</p>
      </div>

      <div className="mb-6">
        <h3 className="text-xl font-semibold">Priority Distribution</h3>
        <ul>
          <li><strong>Low Priority:</strong> {priorityDistribution?.low}</li>
          <li><strong>Medium Priority:</strong> {priorityDistribution?.medium}</li>
          <li><strong>High Priority:</strong> {priorityDistribution?.high}</li>
        </ul>
      </div>

      <div>
        <h3 className="text-xl font-semibold mb-4">Tasks</h3>
        {tasks.length > 0 ? (
          <ul>
            {tasks.map((task) => (
              <li key={task._id} className="mb-4 p-4 border rounded-md">
                <h4 className="text-lg font-semibold">{task.title}</h4>
                <p className="text-gray-600">{task.description}</p>
                <p className="mt-2"><strong>Assigned To:</strong> {task.assinged_to?.first_name}</p>
                <p className="mt-2"><strong>Due Date:</strong> {new Date(task.due_date).toLocaleDateString()}</p>
                <p className="mt-2">
                  <strong>Status:</strong> <span className={`text-${task.status === 'completed' ? 'green' : 'orange'}-500`}>{task.status}</span>
                </p>
                <p className="mt-2">
                  <strong>Priority:</strong> <span className={`text-${task.priority === 'high' ? 'red' : task.priority === 'medium' ? 'yellow' : 'green'}-500`}>{task.priority}</span>
                </p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No tasks available.</p>
        )}
      </div>
    </div>
  );
};

export default TaskReport;
