import Button from '@/components/Button'
import { PostModel } from '@/models/post'
import React, { SetStateAction, useEffect, useRef, useState } from 'react'
import VideoRecommendActions from './VideoRecommendActions';
import { Link } from 'react-router-dom';
import clsx from 'clsx';
import VideoRecommendInfo from './VideoRecommendInfo';
import { Dispatch } from 'react';
import FollowService from '@/features/follow/followService';
import showToast from '@/utils/toast';
export interface VideoRecommendChildProps {
  post : PostModel
  isFollow : boolean
  setIsFollow : Dispatch<SetStateAction<boolean>>
  followUser : ()=>void
}
const VideoRecommend = ({post} : {post : PostModel}) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isFollow,setIsFollow] = useState<boolean>(post.isFollow!);
  useEffect(()=>{
    if (videoRef && videoRef.current) {
      const observer = new IntersectionObserver((entries)=> {
        entries[0].isIntersecting ? videoRef.current!.play() : videoRef.current!.pause();
      },{threshold : [0.6]})
      observer.observe(videoRef.current)
      return () => {
        if (videoRef.current) {
          observer.unobserve(videoRef.current);
        }
      };
    }
    
  },[])
  const followUser = async ()=> {
    if (!isFollow) {
      await FollowService.followUser(post.poster!)
      .then((data)=>{
        setIsFollow(true);
      })
      .catch((err)=>{
        showToast.error(err.response.data.mes)
      })
    } else {
      await FollowService.unfollowUser(post.poster!)
      .then((data)=>{
        setIsFollow(false);
      })
      .catch((err)=>{
        showToast.error(err.response.data.mes)
      })
    }
  }
  
  return (
    <div className='px-5 w-full flex' id={"post-"+post.id}>
      
        <div className='min-w-[56px] max-w-[56px] h-[56px] rounded-full me-4'>
          <Link to={"/user/"+post.posterData.userName}>
            <img src={post.posterData.avatarData.url || ''} alt="User Data"/>
          </Link>
        </div>
      <div className='flex-1'>
        <VideoRecommendInfo followUser={followUser} post={post} isFollow={isFollow} setIsFollow={setIsFollow}/>
        {/* Video */}
        <div className="flex mt-5">
          <video
            autoPlay
            loop
            ref={videoRef}
           className='min-w-[40%] max-w-[65%] md:max-w-[45%] min-h-[200px] rounded-lg overflow-hidden bg-black'>
            <source src={post.videoUrl || ""} type='video/mp4'/>
          </video>
          <VideoRecommendActions followUser={followUser} post={post} isFollow={isFollow} setIsFollow={setIsFollow}/>
        </div>
      </div>

    </div>
  )
}

export default VideoRecommend