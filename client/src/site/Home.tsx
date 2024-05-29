import PostService, { PostsPayload } from '@/features/post/postService';
import { PostModel } from '@/models/post';
import React, { useEffect, useState } from 'react'
import VideoRecommend from './components/VideoRecommend';
import { useDispatch, useSelector } from 'react-redux';
import { getPostsSelector, postSelector } from '@/redux/selector';
import { AppDispatch } from '@/redux/store';
import { getPosts } from '@/features/post/postSlice';
import Button from '@/components/Button';
import { Spin } from 'antd';

const Home = () => {
  const posts = useSelector(getPostsSelector)
  const postState = useSelector(postSelector)
  const dispacth = useDispatch<AppDispatch>()
  useEffect(()=> {
    dispacth(getPosts())
  },[])
  return (
    <div className='h-full flex-1 flex flex-col items-center overflow-y-auto pt-5 pb-10'>
      <div className='w-full md:w-[75%] lg:w-[60%] h-full flex flex-col'>
        {posts && posts.map((post :PostModel,index)=>
          <div className='h-fit' key={index}>
            <VideoRecommend post={post} />
            <div className='h-[1px] w-full bg-gray-100 my-5'></div>
          </div>
        )}
        {posts && postState?.isError && 
          <div className='m-auto w-[300px] flex flex-col items-center'>
            <p className='text-center'>Something went error, please try again</p>
            <Button onClick={()=> {window.location.reload()}} outline className=' max-w-[100px] py-2 px-2 mt-5'>Try again</Button>
          </div>
        }
        {posts && postState?.isLoading && !postState.isError && 
        <div className='m-auto'>
            <Spin tip="Loading" size="large" className='h-fit w-fit text-gray-400'></Spin>
        </div>
         
        }
      </div>
    </div>
  )
}

export default Home