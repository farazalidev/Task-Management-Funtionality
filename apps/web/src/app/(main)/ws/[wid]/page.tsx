"use client"
import Button from '@/components/button/Button';
import CircleLoader from '@/components/status/CirlceLoader';
import DisplayError from '@/components/status/Error';
import NoData from '@/components/status/NoData';
import TaskComponent, { Task } from '@/components/workspace/Task/Task';
import { GetWorkspaceTasks } from '@/utils/api';
import Link from 'next/link';
import React from 'react'
import useSWR from 'swr';

interface pageProps {
        params: {
                wid: string
        }
}


const Page: React.FC<pageProps> = ({ ...props }) => {

        const wid = props.params.wid;

        const { data, error, isLoading } = useSWR([`/workspace/tasks`, wid], ([endpoint, wid]) => GetWorkspaceTasks(endpoint, wid))

        if (isLoading) {
                return <CircleLoader />
        }

        if (error) {
                return <DisplayError errorMessage={error?.message} />
        }

        return <div className='w-full h-full' {...props}>
                <div className='flex place-items-center justify-between px-2 py-3'>

                        <h2 className='text-xl font-bold'>Tasks: {data?.data.workspace?.name}</h2>
                        <div className='flex place-items-center gap-3'>

                                <Link href={`/ws/${wid}/addtask`}>
                                        <Button label='Add Task' />
                                </Link>

                                <Link href={`/myworkspaces/${wid}/adduser`}>
                                        <Button label='Add User' />
                                </Link>
                        </div>
                </div>
                {data?.data.workspaceTasks.length === 0 ? <NoData name='Tasks' /> : <div className='w-full grid grid-cols-12 overflow-y-auto'>
                        {data?.data.workspaceTasks?.map((task: Task) => {
                                return <TaskComponent key={task?._id} task={task} />
                        })}
                </div>}
        </div>
};
export default Page     