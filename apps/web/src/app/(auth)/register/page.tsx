import RegistrationForm from '@/components/auth/RegistrationFor';
import React from 'react'

interface pageProps{  }


const page: React.FC<pageProps> = () => {
        return <div className='w-full h-full flex justify-center place-items-center'><RegistrationForm/></div>
};
export default page