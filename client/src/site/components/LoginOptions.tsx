import React from 'react'
import ButtonAuth from './ButtonAuth'
import { Variant } from '../Auth'
import { FaGithub } from "react-icons/fa6";
import { FaFacebook,FaGoogle,FaRegUserCircle } from "react-icons/fa";
import GoogleIcon from '@/assets/google-icon.svg';
import Button from '@/components/Button';
const LoginOptions = ({setVariant} : {setVariant : (variant : Variant)=>void}) => {
  return (
    <div className='flex flex-col items-center w-full'>
        <h1 className='text-center font-bold text-3xl'>Log In to TikTok</h1>
        <p className='text-gray-400 text-center font-medium mt-5'>Manage your account, check notifications, comment on videos, and more.</p>
        <div className='w-full max-h-[460px]'>
          <ButtonAuth icon={<FaRegUserCircle fontSize={20}  />}  text='Use phone / email / username' onClick={()=>{setVariant('LOGIN_EMAIL')}}></ButtonAuth>
          <ButtonAuth icon={<FaFacebook fontSize={20} color='#0075FA'/>}  text='Continue with Facebook'></ButtonAuth>
          <ButtonAuth icon={<img src={GoogleIcon} alt="Google Icon" width={20} />}  text='Continue with Google'></ButtonAuth>
          <ButtonAuth icon={<FaGithub fontSize={20}/>} text='Continue with Github'></ButtonAuth>
          <Button href='/'>Continue as Guest</Button>
        </div>
    </div>
  )
}

export default LoginOptions