// src/page/DashboardPage.jsx
import React, { useState } from 'react';
import SidebarLeft from '../components/layout/SidebarLeft';

const DashboardPage = () => {
    const [selectedConv, setSelectedConv] = useState(null);

    return (
        <div className="flex h-screen w-full bg-white overflow-hidden">
            {/* Phần bên trái */}
            <SidebarLeft onSelectConversation={(conv) => setSelectedConv(conv)} />

            {/* Phần bên phải (Tạm thời để trống) */}
            <div className="flex-1 flex items-center justify-center bg-gray-50 text-gray-400">
                {selectedConv ? `Bạn đang chọn: ${selectedConv.name}` : "Chọn một hội thoại để bắt đầu"}
            </div>
        </div>
    );
};

export default DashboardPage;