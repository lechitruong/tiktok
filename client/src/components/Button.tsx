import React from 'react'
import clsx from 'clsx'
interface ButtonProps {
    text? : string;
    type? : string;
    id? : string;
    onClick? : () => void;
    disabled? : boolean;
    secondary? : boolean;
    children? : React.ReactNode;
    fullWitdth? : boolean;
    danger? : boolean;
    className? :string
}
const Button : React.FC<ButtonProps> = ({
    text,
    type,
    id,
    onClick,
    disabled,
    secondary,
    children,
    fullWitdth,
    danger,
    className
}) => {
  return (
    <button 
        onClick={onClick}
        type={type}
        disabled={disabled}
        className={clsx(`
            flex
            justify-center
            rounded-md
            p-3
            font-bold
            w-full   
            text-[16px]
        `,
        disabled && 'opacity-70 cursor-default',
        fullWitdth && 'w-full',
        secondary && 'text-color bg-gray-300',
        danger && 'bg-rose-600 hover:bg-rose-500',
        !secondary && !danger && 'bg-[#FE2C55] hover:hover:bg-gradient-to-r hover:from-transparent hover:via-transparent hover:to-transparent hover:to-red-500 text-white',
        className
        )}>
            {children}
    </button>
  )
}

export default Button