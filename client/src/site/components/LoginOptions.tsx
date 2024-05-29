import React from 'react'
import ButtonAuth from './ButtonAuth';
import { FaGithub } from "react-icons/fa6";
import { FaFacebook,FaGoogle,FaRegUserCircle } from "react-icons/fa";
import GoogleIcon from '@/assets/google-icon.svg';
import Button from '@/components/Button';
import { baseURL } from '@/axios';
import { useNavigate } from 'react-router-dom';
// 4. Display Login Required Message
const LoginOptions = () => {
  const navigate = useNavigate();
  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='text-center font-bold text-3xl'>Log In to TikTok</h1>
        <p className='text-gray-400 text-center font-medium mt-5'>Manage your account, check notifications, comment on videos, and more.</p>
        <div className='w-full max-h-[460px]'>
          <ButtonAuth icon={<FaRegUserCircle fontSize={20}  />}  text='Use phone / email / username' onClick={()=>{navigate('/login-email')}}></ButtonAuth>
          <ButtonAuth href={baseURL+"auth/google"} icon={<FaFacebook fontSize={20} color='#0075FA'/>}  text='Continue with Facebook'></ButtonAuth>
          <ButtonAuth href={baseURL+"auth/google"} icon={<img src={GoogleIcon} alt="Google Icon" width={20} />}  text='Continue with Google'></ButtonAuth>
          <ButtonAuth href={baseURL+"auth/github"} icon={<FaGithub fontSize={20}/>} text='Continue with Github'></ButtonAuth>
          <Button href='/'>Continue as Guest</Button>
        </div>
    </div>
  )
}

export default LoginOptions