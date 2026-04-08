// src/hooks/useSidebar.js
import { useState, useEffect } from 'react';
import { getMyConversation } from '../api/conservation';
import { searchUsers, getFriendsList, sendFriendRequest, acceptFriendRequest, removeFriendOrRequest } from '../api/auth';

export const useSidebar = () => {
    const [conversations, setConversations] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('chat'); // 'chat' hoặc 'requests'
    const [loading, setLoading] = useState(false);

    // Lấy danh sách hội thoại
    const fetchConversations = async () => {
        try {
            setLoading(true);
            const data = await getMyConversation();
            setConversations(data);
        } catch (error) {
            console.error("Lỗi lấy danh sách hội thoại:", error);
        } finally {
            setLoading(false);
        }
    };

    // Tìm kiếm người dùng (khi nhập sẽ hiển thị đè lên)
    const handleSearch = async (keyword) => {
        setSearchTerm(keyword);
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const data = await searchUsers(keyword);
            setSearchResults(data);
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        }
    };

    // Lấy danh sách bạn bè/lời mời
    const fetchFriendsData = async () => {
        try {
            const data = await getFriendsList();
            // Giả định BE trả về object có chứa lời mời kết bạn
            setFriendRequests(data.requests || []); 
        } catch (error) {
            console.error("Lỗi lấy danh sách lời mời:", error);
        }
    };

    useEffect(() => {
        fetchConversations();
        fetchFriendsData();
    }, []);

    return {
        conversations,
        searchResults,
        friendRequests,
        searchTerm,
        activeTab,
        loading,
        setActiveTab,
        handleSearch,
        refresh: fetchConversations
    };
};