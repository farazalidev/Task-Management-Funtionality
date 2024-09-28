/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";
import CircleLoader from '@/components/status/CirlceLoader';
import DisplayError from '@/components/status/Error';
import { GetUserTasksReports } from '@/utils/api';
import React from 'react';
import useSWR from 'swr';


const Page: React.FC= () => {
    const { data, error } = useSWR("/user/reports", GetUserTasksReports);

    if (error) {
        return <DisplayError errorMessage={`Caught error: ${error?.message}`} />;
    }

    if (!data) {
        return <CircleLoader/>
    }

    const { user, totalTasks, completedTasks, assignedTasksCount, percentageCompleted, priorityDistribution } = data.data;

    return (
        <div  className="p-6 bg-white shadow-lg rounded-lg w-full h-full">
            <h1 className="text-2xl font-bold mb-4">
                Task Report for {user.firstName} {user.lastName}
            </h1>
            <p className="mb-2"><strong>Total Tasks:</strong> {totalTasks}</p>
            <p className="mb-2"><strong>Completed Tasks:</strong> {completedTasks}</p>
            <p className="mb-2"><strong>Assigned Tasks Count:</strong> {assignedTasksCount}</p>
            <p className="mb-4"><strong>Percentage Completed:</strong> {percentageCompleted}%</p>
            <h2 className="text-xl font-semibold mb-2">Priority Distribution</h2>
            <ul className="list-disc ml-6">
                <li>Low: {priorityDistribution.low}</li>
                <li>Medium: {priorityDistribution.medium}</li>
                <li>High: {priorityDistribution.high}</li>
            </ul>
            {data.data.tasks.length > 0 && (
                <div className="mt-4">
                    <h2 className="text-xl font-semibold mb-2">Tasks</h2>
                    <ul className="list-disc ml-6">
                        {data.data.tasks.map((task: any) => (
                            <li key={task._id}>
                                {task.title} - {task.status}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
};

export default Page;
