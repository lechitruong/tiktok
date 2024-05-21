import PostService, { PostsPayload } from '@/features/post/postService';
import { PostModel } from '@/models/post';
import React, { useEffect, useState } from 'react'
import VideoRecommend from './components/VideoRecommend';

const Home = () => {
  const [posts, setPosts] = useState<PostModel[]>([]);
  useEffect(()=> {
    const getPosts = async ()=> {
      const resp :PostsPayload  = await PostService.getPosts();
      setPosts(resp.posts)
    }
    getPosts()
  },[])
  return (
    <div className='h-full flex-1 flex flex-col items-center overflow-y-auto pt-5 pb-10'>
      <div className='w-full md:w-[75%] lg:w-[60%] '>
        {posts.map((post :PostModel,index)=>
          <div key={index}>
            <VideoRecommend post={post} />
            <div className='h-[1px] w-full bg-gray-100 my-5'></div>
          </div>
        )}
      </div>
    </div>
  )
}

export default Home