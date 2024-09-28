/* eslint-disable @typescript-eslint/no-explicit-any */
import AddTaskForm from '@/components/workspace/Task/AddTaskForm';
import React from 'react'



const Page: React.FC= (props:any) => {
    return <div>
        <AddTaskForm workspace_id={ props?.params?.wid} />
        
        </div>
};
export default Page