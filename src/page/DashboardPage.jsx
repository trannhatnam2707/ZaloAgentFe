import React, { useState } from 'react';
import SidebarLeft from '../components/layout/MainLayout/SidebarLeft';

const DashboardPage = () => {
    const [currentConv, setCurrentConv] = useState(null);

    return (
        <div className="flex h-screen w-full bg-[#f0f2f5] overflow-hidden font-sans">
            {/* Sidebar bên trái */}
            <SidebarLeft onSelectConversation={(conv) => setCurrentConv(conv)} />

            {/* Vùng Content ở giữa (Sẽ build sau) */}
            {/* <div className="flex-1 flex flex-col">
                {currentConv ? (
                    <div className="flex-1 flex items-center justify-center text-gray-400 italic">
                        Đang hiển thị hội thoại: {currentConv.name}
                    </div>
                ) : (
                    <div className="flex-1 flex flex-col items-center justify-center text-gray-500">
                        <i className="fas fa-comments text-6xl mb-4 text-gray-200"></i>
                        <p className="text-lg">Chào mừng bạn quay trở lại!</p>
                        <p className="text-sm">Hãy chọn một cuộc trò chuyện để bắt đầu.</p>
                    </div>
                )}
            </div> */}
        </div>
    );
};

export default DashboardPage;