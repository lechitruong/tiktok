import React, { useEffect, useState } from 'react'
import LoginOptions from './components/LoginOptions'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch } from '@/redux/store'
import { loginSuccess } from '@/features/auth/authSlice'
import { authSelector } from '@/redux/selector'
import { useNavigate } from 'react-router-dom'
const Login = () => {
  const dispatch = useDispatch<AppDispatch>()
  const authState = useSelector(authSelector);
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const action = params.get('action');
    if (action === 'loginSuccess') {
      dispatch(loginSuccess())
    }
    if (authState.isSuccess) {
      navigate('/');
    }
  }, []);
  useEffect(() => {
    if (authState.isSuccess) {
        navigate('/');
    }
  }, [authState.isSuccess, navigate]);
  return (
      <div className='flex-1 w-full justify-center flex overflow-y-scroll px-3'>
        <div className=" flex  mt-10 md:mt-16 min-w-[330px] max-w-[390px]">
          <LoginOptions/>
        </div>
      </div>
      
  )
}

export default Login