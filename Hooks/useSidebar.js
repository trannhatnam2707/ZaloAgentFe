import { useState, useEffect } from 'react';
import { getMyConversation } from '../src/api/conservation';
import { searchUsers, getFriendsList } from '../src/api/auth';

export const useSidebar = () => {
    const [conversations, setConversations] = useState([]);
    const [friendRequests, setFriendRequests] = useState([]);
    const [searchResults, setSearchResults] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState('chat'); 
    const [loading, setLoading] = useState(false);

    const fetchData = async () => {
        setLoading(true);
        try {
            const [convRes, friendRes] = await Promise.all([
                getMyConversation(),
                getFriendsList()
            ]);
            setConversations(convRes || []);
            setFriendRequests(friendRes?.requests || []); 
        } catch (error) {
            console.error("Lỗi Sidebar:", error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = async (keyword) => {
        setSearchTerm(keyword);
        if (!keyword.trim()) {
            setSearchResults([]);
            return;
        }
        try {
            const data = await searchUsers(keyword);
            setSearchResults(data || []);
        } catch (error) {
            console.error("Lỗi tìm kiếm:", error);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    return { conversations, friendRequests, searchResults, searchTerm, activeTab, setActiveTab, handleSearch, refresh: fetchData };
};