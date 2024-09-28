/* eslint-disable @typescript-eslint/no-explicit-any */
import AddUserForm from '@/components/workspace/AddUserForm';
import React from 'react'

interface pageProps{  }


const page: React.FC<pageProps> = (props:any) => {
        const wid = props?.params?.wid;
        return <div><AddUserForm workspace_id={ wid} /></div>
};
export default page