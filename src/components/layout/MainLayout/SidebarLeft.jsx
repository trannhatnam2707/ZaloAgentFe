import React from 'react';
import { useSidebar } from '../../../../Hooks/useSidebar';
import { logout, sendFriendRequest, acceptFriendRequest } from '../../../api/auth';

const SidebarLeft = ({ onSelectConversation }) => {
    const { 
        conversations, searchResults, friendRequests, 
        searchTerm, activeTab, setActiveTab, handleSearch 
    } = useSidebar();

    return (
        <div className="flex flex-col h-full w-[350px] bg-white border-r border-gray-100 shadow-sm overflow-hidden font-sans">
            {/* --- TOP: BRAND & SEARCH --- */}
            <div className="p-6 pb-2">
                <div className="flex items-center justify-between mb-6">
                    <h1 className="text-2xl font-black bg-gradient-to-r from-blue-600 to-indigo-500 bg-clip-text text-transparent">
                        Zalo Agent
                    </h1>
                    <button className="w-10 h-10 flex items-center justify-center bg-blue-50 text-blue-600 rounded-2xl hover:bg-blue-600 hover:text-white transition-all shadow-sm">
                        <i className="fas fa-plus"></i>
                    </button>
                </div>
                
                <div className="relative group">
                    <i className="fas fa-search absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 group-focus-within:text-blue-500 transition-colors"></i>
                    <input
                        type="text"
                        placeholder="Tìm bạn bè hoặc nhóm..."
                        className="w-full pl-11 pr-4 py-3 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-blue-100 focus:bg-white transition-all text-sm"
                        value={searchTerm}
                        onChange={(e) => handleSearch(e.target.value)}
                    />
                </div>
            </div>

            {/* --- TABS --- */}
            <div className="flex px-6 py-4 gap-2">
                <button 
                    onClick={() => setActiveTab('chat')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${activeTab === 'chat' ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                    CHAT
                </button>
                <button 
                    onClick={() => setActiveTab('requests')}
                    className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all relative ${activeTab === 'requests' ? 'bg-indigo-600 text-white shadow-lg shadow-indigo-100' : 'text-gray-400 hover:bg-gray-100'}`}
                >
                    LỜI MỜI
                    {friendRequests.length > 0 && (
                        <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-[10px] rounded-full flex items-center justify-center border-2 border-white animate-bounce">
                            {friendRequests.length}
                        </span>
                    )}
                </button>
            </div>

            {/* --- MAIN LIST --- */}
            <div className="flex-1 overflow-y-auto px-4 custom-scrollbar">
                {searchTerm.trim() !== "" && (
                    <div className="mb-4">
                        <p className="px-2 mb-2 text-[10px] font-bold text-gray-400 uppercase tracking-widest">Kết quả tìm kiếm</p>
                        {searchResults.map(user => (
                            <div key={user.id} className="flex items-center justify-between p-3 rounded-2xl hover:bg-blue-50 transition-all mb-1">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-blue-500 to-indigo-400 flex items-center justify-center text-white font-bold text-sm">
                                        {user.username.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-semibold text-gray-700">{user.username}</span>
                                </div>
                                <button onClick={() => sendFriendRequest(user.id)} className="text-blue-600 p-2 hover:bg-white rounded-xl shadow-sm transition-all">
                                    <i className="fas fa-user-plus"></i>
                                </button>
                            </div>
                        ))}
                    </div>
                )}

                <div className="space-y-1">
                    {activeTab === 'chat' ? (
                        conversations.map(conv => (
                            <div 
                                key={conv.id} 
                                onClick={() => onSelectConversation(conv)}
                                className="flex items-center gap-4 p-4 rounded-3xl hover:bg-white hover:shadow-xl hover:shadow-gray-100 cursor-pointer transition-all border border-transparent hover:border-gray-50 group"
                            >
                                <div className="relative">
                                    <div className="w-12 h-12 rounded-2xl bg-gray-100 flex items-center justify-center text-blue-600 font-bold text-lg group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                                        {conv.name ? conv.name.charAt(0).toUpperCase() : "G"}
                                    </div>
                                    <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-green-500 border-2 border-white rounded-full shadow-sm"></div>
                                </div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-bold text-sm text-gray-800 truncate">{conv.name || "Nhóm trò chuyện"}</h4>
                                    <p className="text-xs text-gray-400 truncate mt-1">Nhấp để nhắn tin...</p>
                                </div>
                            </div>
                        ))
                    ) : (
                        friendRequests.map(req => (
                            <div key={req.id} className="p-4 bg-gray-50 rounded-3xl space-y-4 mb-3 border border-gray-100">
                                <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center text-blue-600 font-bold shadow-sm">
                                        {req.sender_username?.charAt(0).toUpperCase()}
                                    </div>
                                    <span className="text-sm font-bold text-gray-700">{req.sender_username}</span>
                                </div>
                                <div className="flex gap-2">
                                    <button onClick={() => acceptFriendRequest(req.id)} className="flex-1 py-2 bg-blue-600 text-white text-[10px] font-bold rounded-xl hover:bg-blue-700 transition-all shadow-md shadow-blue-100">CHẤP NHẬN</button>
                                    <button className="flex-1 py-2 bg-white text-gray-400 text-[10px] font-bold rounded-xl border border-gray-100 hover:bg-gray-50 transition-all">BỎ QUA</button>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>

            {/* --- FOOTER --- */}
            <div className="p-6">
                <button 
                    onClick={() => logout()}
                    className="flex items-center gap-3 w-full p-4 text-red-500 hover:bg-red-50 rounded-3xl transition-all font-bold text-sm group"
                >
                    <div className="w-9 h-9 rounded-xl bg-red-50 flex items-center justify-center group-hover:bg-red-500 group-hover:text-white transition-all">
                        <i className="fas fa-power-off"></i>
                    </div>
                    Đăng xuất
                </button>
            </div>
        </div>
    );
};

export default SidebarLeft;