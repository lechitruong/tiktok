import React from 'react'
import Header from './components/DefaultLayout/Header'
import Sidebar from './components/DefaultLayout/Sidebar'
export interface LayoutProps {
  children : React.ReactNode
}

const DefaultLayout = ({children} : LayoutProps) => {

  return (
    <div className='h-full'>
      <Header/>
      <div className='flex h-full'>
        
        <Sidebar/>
        <div className='w-full'>
          {children}
        </div>
      </div>
    </div>
  )
}

export default DefaultLayout