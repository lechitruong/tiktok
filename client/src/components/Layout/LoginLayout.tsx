import { QuestionCircleOutlined } from '@ant-design/icons'
import React, { useEffect } from 'react'
import TiktokLogo from '@/assets/tiktok-logo.svg'
import { LayoutProps } from './DefaultLayout'
import clsx from 'clsx'
const LoginLayout = ({children,fullScreen}: LayoutProps) => {
    
  return (
    <div className={clsx('bg-white flex justify-center items-center w-full flex-col',fullScreen ? 'h-dvh overflow-hidden' : 'h-full')}>
      <header className='flex justify-between px-6 mt-3 w-full'>
        <a href="/" className=''>
          <img src={TiktokLogo} alt=""/>
        </a>
        <div className='flex gap-3 my-auto gap-2'>
        <QuestionCircleOutlined className='my-auto' />
        <p className='font-semibold hidden md:block'>Feedback and help</p>
        </div>
      </header>
      {children}
      <div className='w-full flex flex-col items-center'>
        <hr className='bg-gray-200 w-full h-[0.4px]'/>
        <p className='font-semibold py-6 text-center bg-[#f0f0f07f] md:bg-white w-full'>
           Don't have an account? 
           <a href='/register' className='text-[#fe2c55]'> Sign up</a>
        </p>
        <div className='bg-[#121212] h-[75px] px-[100px] w-full justify-between hidden md:flex'>
            <div className='border-[0.5px] border-[#ffffff8e] h-fit my-auto text-white px-3 py-1  pe-16'>
              English
            </div>
            <p className='text-gray-400 font-semibold opacity-60 my-auto'>© 2024 TikTok</p>
        </div>
      </div>
    </div>
  )
}

export default LoginLayout