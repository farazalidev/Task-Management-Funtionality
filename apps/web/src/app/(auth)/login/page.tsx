import LoginForm from '@/components/auth/LoginForm';
import React from 'react'

interface pageProps{  }


const page: React.FC<pageProps> = () => {
    return <div className='w-full h-full flex justify-center place-items-center'>
            <LoginForm/>
        </div>
};
export default page