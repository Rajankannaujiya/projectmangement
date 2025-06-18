"use client"

import React, { useEffect } from 'react'
import Navbar from '@/components/Navbar'
import Sidebar from '@/components/Sidebar'
import StoreProvider, { useAppDispatch, useAppSelector } from './redux';

const DashboarLayout = ({children}:{children:React.ReactNode}) => {
  const isSidebarCollapsed = useAppSelector((state)=>state.global.isSidebarCollapsed);
  const isDarkMode = useAppSelector((state)=>state.global.isDarkMode);

  useEffect(()=>{
    if(isDarkMode){
      document.documentElement.classList.add("dark");
      console.log("this is the output",document.documentElement.className);
    }
    else{
      document.documentElement.classList.remove("dark");
      console.log(document.documentElement.className);
    }
  },[isDarkMode])

  return (
    <div className='flex min-h-screen w-full bg-gray-50 text-gray-900'>

        {/* sidebar */}
        <Sidebar />
        <main className={`flex w-full flex-col bg-gray-50 dark:bg-dark-bg ${ isSidebarCollapsed ? "" :
          "md:pl-64"
          }`}>
            {/* navbar */}
            <Navbar/>
            {children}  
        </main>
    </div>
  )
};


const DashboardWrapper = ({children}:{children:React.ReactNode}) => {
  return (
    <StoreProvider>
      <DashboarLayout>
        {children}
      </DashboarLayout>
    </StoreProvider>
  )
}
export default DashboardWrapper