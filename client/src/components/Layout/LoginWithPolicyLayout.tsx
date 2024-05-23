import { LayoutProps } from './DefaultLayout'
import React from 'react'
import LoginLayout from './LoginLayout'

const LoginWithPolicyLayout = ({children,fullScreen} :LayoutProps) => {
  return (
    <LoginLayout fullScreen={fullScreen}>
        {children}
        <div className='w-full flex flex-col items-center'>
        <p className='text-center w-[337px] mb-5 lg:mb-12 text-gray-500 text-[12px]'>
            By continuing, you agree to TikTok’s 
            <span><a href="#" className='font-medium text-black'> Terms of Service </a></span> 
            and confirm that you have read TikTok’s <span><a href="#" className='font-medium text-black'> Privacy Policys </a></span> .
        </p>
      </div>
    </LoginLayout>
  )
}

export default LoginWithPolicyLayout