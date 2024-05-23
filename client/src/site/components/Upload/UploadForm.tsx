import React, { useEffect, useRef, useState } from 'react'
import type { UploadFile, UploadProps } from 'antd';
import { IoIosInformationCircleOutline } from 'react-icons/io';
import { useDispatch, useSelector } from 'react-redux';
import { postUploadSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { setPostUpload } from '@/features/post/postSlice';
import ThumnailUpload from './ThumnailUpload';
const UploadForm = () => {
  const dispatch = useDispatch<AppDispatch>()
  const postUpload = useSelector(postUploadSelector)
  const video = postUpload?.video
  const title = postUpload?.title || ''
    const [videoUrl, setVideoUrl] = useState<string>('');
    useEffect(() => {
      if (video && video.originFileObj) {
        const url = URL.createObjectURL(video.originFileObj);
        console.log(url);
        setVideoUrl(url);
      }
    }, []);
    const handleChangeTitle = (e:React.ChangeEvent<HTMLTextAreaElement>)=> {
    const value = e.target.value
        if (value.length <=1000) {
          dispatch(setPostUpload({...postUpload,title : value}))
        }
    }
  return (
    <div className="bg-white rounded-md p-6 mt-3 shadow-sm">
        <div className="flex flex-col md:flex-row">
            <form action="" encType='' className='flex-1'>
                <div>
                    <label htmlFor="title" className='font-semibold'>Description</label>
                    <div className='rounded-md bg-[#F8F8F8] p-5 w-full mt-2'>
                        <textarea value={title} onChange={handleChangeTitle} id='title' name='title' className='h-[70px] bg-transparent w-full outline-none border-none' placeholder='Share more about video here...'></textarea>
                        <div className="flex justify-end">
                        <p className='text-gray-400 font-light'>{title.length}/1000</p>
                        </div>
                    </div>
                </div>
                <ThumnailUpload videoUrl={videoUrl}/>
            </form>
            <div className='ms-0 md:ms-10 mt-8'>
                <video controls className='md:w-[200px] lg:w-[300px] rounded-md' src={videoUrl}></video>
            </div>
        </div>
    </div>
  )
}

export default UploadForm