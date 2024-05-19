import React from 'react'
interface ButtonAuthProps {
    text : string;
    className? : string
    onClick? : () => void,
    icon : React.ReactNode,
    href? : string
}
const ButtonAuth : React.FC<ButtonAuthProps> = ({text, className,onClick,icon,href}) => {
  return (
    <div onClick={href ? ()=>{window.location.href=href}  : onClick} className={'flex  border-gray-300 border-solid border px-4 py-3 rounded-md my-4 hover:cursor-pointer hover:opacity-90 '+className}>
        <div className='w-fit my-auto p-1'>
            {icon}
        </div>
        <p className='font-semibold m-auto'>{text}</p>
    </div>
  )
}

export default ButtonAuth