import React from 'react'
import SidebarLeft from "../components/layout/MainLayout/SidebarLeft"

const DashboardPage = () => {
  return (
    <div className='flex h-screen w-full overflow-hidden'>
        <div className='w-80 h-full border-r-4 border-gray-200 shrink-0'>
            <SidebarLeft/>
        </div>


    
    <div className="flex-1 bg-gray-50">
        <div className="flex items-center justify-center h-full text-gray-400">
            Chọn một cuộc trò chuyện để bắt đầu
        </div>
    </div>

    </div>
  )
}

export default DashboardPage