import React, { useState } from 'react'
import ButtonAuth from './components/ButtonAuth'
import LoginOptions from './components/LoginOptions'
import LoginEmail from './components/LoginEmail'
import { QuestionCircleOutlined } from '@ant-design/icons'
import TiktokLogo from '@/assets/tiktok-logo.svg'
export type Variant = "LOGIN_EMAIL" | "LOGIN" | "REGISTER_EMAIL" | "REGISTER"
const Auth = () => {
  const [variant,setVariant] = useState<Variant>('LOGIN')
  return (
    <div className='bg-white flex justify-center items-center w-full flex-col h-dvh'>
      <header className='flex justify-between px-6 mt-3 w-full'>
        <a href="/" className=''>
          <img src={TiktokLogo} alt=""/>
        </a>
        <div className='flex gap-3 my-auto gap-2'>
        <QuestionCircleOutlined className='my-auto' />
        <p className='font-semibold hidden md:block'>Feedback and help</p>
        </div>
      </header>
      <div className='flex-1 w-full justify-center flex overflow-y-scroll px-3'>
        <div className=" flex  mt-10 md:mt-16 min-w-[330px] max-w-[390px]">
          { variant=== 'LOGIN' && <LoginOptions setVariant={setVariant}/>}
          { variant=== 'LOGIN_EMAIL' && <LoginEmail setVariant={setVariant}/>}
        </div>
      </div>
      <div className='w-full flex flex-col items-center'>
        {
          (variant === "LOGIN" || variant === "REGISTER") && 
          <p className='text-center w-[337px] mb-5 lg:mb-12 text-gray-500 text-[12px]'>
            By continuing, you agree to TikTok’s 
            <span><a href="#" className='font-medium text-black'> Terms of Service </a></span> 
            and confirm that you have read TikTok’s <span><a href="#" className='font-medium text-black'> Privacy Policys </a></span> .
          </p>
        }
        <hr className='bg-gray-200 w-full h-[0.4px]'/>
        <p className='font-semibold py-6 text-center bg-[#f0f0f07f] md:bg-white w-full'>
          Don't have an account? 
          <a href="#" className='text-[#fe2c55]'> Sign up</a>
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

export default Auth