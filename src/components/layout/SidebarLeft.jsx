// src/components/layout/SidebarLeft.jsx
import React from 'react';
import { useSidebar } from '../../../Hooks/useSidebar';
import { logout, sendFriendRequest, acceptFriendRequest, removeFriendOrRequest } from '../../api/auth';

const SidebarLeft = ({ onSelectConversation }) => {
    const { 
        conversations, searchResults, friendRequests, 
        searchTerm, activeTab, setActiveTab, handleSearch 
    } = useSidebar();

    return (
        <div className="flex flex-col h-full w-80 border-r border-gray-200 bg-white">
            {/* 1. Thanh tìm kiếm & Nút tạo nhóm */}
            <div className="p-4 space-y-3">
                <div className="flex items-center gap-2">
                    <div className="relative flex-1">
                        <i className="fas fa-search absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 text-sm"></i>
                        <input
                            type="text"
                            placeholder="Tìm kiếm người dùng..."
                            className="w-full pl-9 pr-3 py-2 bg-gray-100 rounded-lg text-sm focus:outline-none focus:ring-1 focus:ring-blue-500"
                            value={searchTerm}
                            onChange={(e) => handleSearch(e.target.value)}
                        />
                    </div>
                    <button className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100" title="Tạo nhóm">
                        <i className="fas fa-users-medical text-lg"></i>
                    </button>
                </div>

                {/* 2. Nút chuyển đổi Trò chuyện / Lời mời */}
                <div className="flex bg-gray-100 p-1 rounded-lg">
                    <button 
                        onClick={() => setActiveTab('chat')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition ${activeTab === 'chat' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        Trò chuyện
                    </button>
                    <button 
                        onClick={() => setActiveTab('requests')}
                        className={`flex-1 py-1.5 text-xs font-semibold rounded-md transition relative ${activeTab === 'requests' ? 'bg-white shadow text-blue-600' : 'text-gray-500'}`}
                    >
                        Lời mời
                        {friendRequests.length > 0 && (
                            <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] text-white">
                                {friendRequests.length}
                            </span>
                        )}
                    </button>
                </div>
            </div>

            {/* 3. Danh sách hiển thị (Cuộc hội thoại / Lời mời / Kết quả tìm kiếm) */}
            <div className="flex-1 overflow-y-auto relative">
                {/* HIỂN THỊ ĐÈ KẾT QUẢ TÌM KIẾM KHI ĐANG NHẬP */}
                {searchTerm.trim() !== "" && (
                    <div className="absolute inset-0 bg-white z-20 overflow-y-auto">
                        <p className="px-4 py-2 text-[11px] font-bold text-gray-400 uppercase">Người dùng tìm thấy</p>
                        {searchResults.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-3 hover:bg-gray-50 border-b border-gray-50">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-medium">{user.username}</span>
                                </div>
                                <button 
                                    onClick={() => sendFriendRequest(user.id)}
                                    className="px-3 py-1 bg-blue-600 text-white text-xs rounded-full hover:bg-blue-700"
                                >
                                    Kết bạn
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                {/* HIỂN THỊ DANH SÁCH THEO TAB */}
                {activeTab === 'chat' ? (
                    conversations.map(conv => (
                        <div 
                            key={conv.id} 
                            onClick={() => onSelectConversation(conv)}
                            className="flex items-center gap-3 p-3 hover:bg-gray-100 cursor-pointer border-b border-gray-50 transition"
                        >
                            <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-blue-400 to-blue-600 flex items-center justify-center text-white font-bold text-lg shadow-sm">
                                {conv.name ? conv.name.charAt(0).toUpperCase() : "G"}
                            </div>
                            <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="font-semibold text-sm truncate text-gray-800">{conv.name || "Nhóm trò chuyện"}</h4>
                                </div>
                                <p className="text-xs text-gray-500 truncate mt-0.5 italic">Nhấp để xem nội dung</p>
                            </div>
                        </div>
                    ))
                ) : (
                    /* Tab Lời mời kết bạn */
                    friendRequests.map(req => (
                        <div key={req.id} className="p-3 border-b border-gray-50 space-y-2">
                            <div className="flex items-center gap-3">
                                <div className="w-10 h-10 rounded-full bg-gray-200" />
                                <span className="text-sm font-medium">{req.sender_username}</span>
                            </div>
                            <div className="flex gap-2">
                                <button 
                                    onClick={() => acceptFriendRequest(req.id)}
                                    className="flex-1 py-1 text-xs bg-blue-600 text-white rounded hover:bg-blue-700"
                                >
                                    Chấp nhận
                                </button>
                                <button 
                                    onClick={() => removeFriendOrRequest(req.id)}
                                    className="flex-1 py-1 text-xs bg-gray-200 text-gray-700 rounded hover:bg-gray-300"
                                >
                                    Xóa
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>

            {/* 4. Chân trang: Đăng xuất */}
            <div className="p-3 border-t border-gray-100">
                <button 
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full p-2.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors duration-200 group"
                >
                    <div className="w-8 h-8 rounded-full bg-red-50 flex items-center justify-center group-hover:bg-red-100">
                        <i className="fas fa-sign-out-alt"></i>
                    </div>
                    <span className="font-semibold text-sm">Đăng xuất</span>
                </button>
            </div>
        </div>
    );
};

export default SidebarLeft;