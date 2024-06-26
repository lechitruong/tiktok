import React from 'react'
import LinkSidebar from './LinkSidebar'
import { AiOutlineHome ,AiOutlineUser } from "react-icons/ai";
import { RiUserFollowLine } from "react-icons/ri";
import { LuUsers2 } from "react-icons/lu";
import { IoCompassOutline } from "react-icons/io5";
import { MdLiveTv } from "react-icons/md";
import { useSelector } from 'react-redux';
import { currentUserSelector } from '@/redux/selector';
import Button from '@/components/Button';
import Scrollbar from "react-scrollbars-custom";
const Sidebar = () => {
    const user = useSelector(currentUserSelector);
  return (
    <div className="p-4 pt-8 h-full bg-white min-w-[70px]  w-fit lg:w-[250px] border-e-[1px] border-gray-200 lg:border-none overflow-y-auto">
        <nav className='ps-1 mb-2 '>
             <ul>
                 <LinkSidebar href='/' active icon={<AiOutlineHome className='my-auto' fontSize={25} />}>For You</LinkSidebar>
                 <LinkSidebar href='/following' icon={<RiUserFollowLine className='my-auto' fontSize={25} />}>Following</LinkSidebar>
                 <LinkSidebar href='/friends' icon={<LuUsers2 className='my-auto' fontSize={25} />}>Friends</LinkSidebar>
                 <LinkSidebar href='/explore' icon={<IoCompassOutline className='my-auto' fontSize={25} />}>Explore</LinkSidebar>
                 <LinkSidebar href='/live' icon={<MdLiveTv className='my-auto' fontSize={25} />}>LIVE</LinkSidebar>
                 <LinkSidebar href='/profile' icon={user ? <img className='rounded-[50%] max-w-6 min-w-6 h-6' src={user.avatarData.url || ''} alt='User avatar'/> : <AiOutlineUser className='my-auto' fontSize={25} />}>Profile</LinkSidebar>
             </ul>
        </nav>
        {!user && 
         <div className='flex flex-col hidden lg:block'>
             <div className='h-[1px] w-full bg-gray-100'></div>
             <p className='text-gray-400 my-5'>Log in to follow creators, like videos, and view comments.</p>
             <Button href='/login' outline className='text-[18px] font-medium'>Log in</Button>    
         </div>
        }
        <div className='h-[1px] w-full bg-gray-100 my-5'></div>
         {/* About */}
        <div className='hidden lg:block'>
              <p className='font-bold text-gray-400'>Company</p>
              <ul className='flex justify-between my-2'>
                 <li>
                     <a href="/about" className='text-gray-400'>About</a>
                 </li>
                 <li>
                     <a href="/about" className='text-gray-400'>Newroom</a>
                 </li>
                 <li>
                     <a href="/about" className='text-gray-400'>Contact</a>
                 </li>
              </ul>
        </div>
        {/* End About */}
            
    </div>
   
    
  )
}

export default Sidebar