import clsx from 'clsx'
import React from 'react'
interface UploadRequirementProps {
    icon : React.ReactNode
    title : string
    description : string
    className? : string
}
const UploadRequirement = ({icon,title,description,className} : UploadRequirementProps) => {
  return (
    <div className={clsx('flex mt-3 mx-3',className)}>
        <div>
            {icon}
        </div>
        <div className='ms-3'>
            <p className='font-semibold text-[18px]'>{title}</p>
            <p className=' text-[14px]'>{description}</p>
        </div>
    </div>
  )
}

export default UploadRequirement