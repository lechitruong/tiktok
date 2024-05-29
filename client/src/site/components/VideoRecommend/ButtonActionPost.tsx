import React from 'react'
interface ButtonActionPostProps {
    icon : React.ReactNode,
    count : number,
    onClick? : () => void,
    postId : number,
    className? : string
}
const ButtonActionPost = ({icon,count,onClick,postId,className}:ButtonActionPostProps) => {
  return (
    <div className={className}>
        <div className='min-w-12 hover:cursor-pointer hover:opacity-90 max-w-12 h-12 rounded-full flex bg-gray-200' onClick={onClick}>
            {icon}
        </div>
        <p className="text-[13px] text-center font-bold text-[#161823bf]">{count}</p>
    </div>
  )
}

export default ButtonActionPost