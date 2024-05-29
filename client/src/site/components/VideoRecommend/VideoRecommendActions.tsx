import React, { useState } from 'react';
import { IoHeart, IoChatbubbleEllipses } from 'react-icons/io5';
import { FaCheck, FaPlus, FaShare } from 'react-icons/fa6';
import ButtonActionPost from './ButtonActionPost';
import { PostModel } from '@/models/post';
import { useNavigate } from 'react-router-dom';
import { VideoRecommendChildProps } from '.';
import { clientURL } from '@/axios';
import showToast from '@/utils/toast';
import useDebounce from '@/hooks/useDebounce';
import PostService from '@/features/post/postService';
import AbstractPayload from '@/utils/abtractPayloadType';
import clsx from 'clsx';
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import { message } from 'antd';
const VideoRecommendActions = ({ post }: VideoRecommendChildProps) => {
  const navigate = useNavigate();
  const user = useSelector(currentUserSelector);
  const [shares, setShares] = useState<number>(post.shares!);
  const [isLiked, setIsLiked] = useState<boolean>(post.isLiked!);
  const [likes, setLikes] = useState<number>(post.likes!);
  const shareVideo = () => {
    navigator.clipboard
      .writeText(clientURL + 'post/' + post.id)
      .then(async () => {
        try {
          const resp: AbstractPayload = await PostService.sharePost(post.id!);
          setShares(shares + 1);
          message.success('Copied link to clipboard');
        } catch (error) {
          message.success('Copied link to clipboard');
        }
      })
      .catch(() => {
        message.error("Can't share video");
      });
  };
  const likePost = async () => {
    if (!isLiked) {
      await PostService.likePost(post.id!)
        .then(() => {
          setLikes(likes + 1);
          setIsLiked(true);
        })
        .catch((err) => {
          // 8. Display Error Message
          message.error(err.response.data.mes);
        });
    } else {
      // 
      await PostService.unlikePost(post.id!)
        .then(() => {
          setIsLiked(false);
          setLikes(likes - 1);
        })
        .catch((err) => {
          message.error(err.response.data.mes);
        });
    }
  };
  return (
    <div className="ms-5 flex flex-col justify-end">
      {!post.isMe ? (
        <div className="mb-4 relative min-w-12 max-w-12 h-12 rounded-full object-cover  object-center">
          <img
            src={post.posterData.avatarData.url || ''}
            width="100%"
            height="100%"
            alt="User avatar"
            className="rounded-full"
          />
        </div>
      ) : (
        ''
      )}
      
     {/* 1. Click Like Button */}
      <ButtonActionPost
        onClick={() => {
          // 2. Check if User is Logged In
          // Alt no login
          // 3. Redirect to Login
          user ? likePost() : navigate('/login');
        }}
        
        className="mt-3"
        // 8. Update Heart Icon to Red, Increment Like Count
        icon={
          <IoHeart
            fontSize={25}
            className={clsx(
              'm-auto active:scale-125  transition-all',
              isLiked && 'text-primary'
            )}
          />
        }
        count={likes}
        postId={post.id!}
      />
      <ButtonActionPost
        onClick={() => {
          navigate('/post/' + post.id);
        }}
        className="mt-3"
        icon={<IoChatbubbleEllipses fontSize={25} className="m-auto" />}
        count={post.comments!}
        postId={post.id!}
      />
      <ButtonActionPost
        onClick={() => {
          user ? shareVideo() : navigate('/login');
        }}
        className="mt-3"
        icon={
          <FaShare
            fontSize={25}
            className="m-auto active:scale-125  transition-all"
          />
        }
        count={shares}
        postId={post.id!}
      />
    </div>
  );
};

export default VideoRecommendActions;
