import React, { createContext, useContext, useState, useEffect } from "react";
import { useAuth } from "../../Hooks/useAuth";

const ChatContext = createContext();

export const ChatProvider = ({ children }) => {
    const { user } = useAuth();
    const [selectedChat, setSelectedChat] = useState(null);
    const [headerInfo, setHeaderInfo] = useState(null);

    useEffect(() => {
        // Nếu chưa chọn chat hoặc chưa có user thì set null và thoát sớm
        if (!selectedChat || !user) {
            setHeaderInfo(null);
            return;
        }

        try {
            const conversationName = selectedChat.conv_name || selectedChat.name;

            if (selectedChat.type === "group") {
                setHeaderInfo({
                    name: conversationName || "Nhóm trò chuyện",
                    avatar: selectedChat.avatar || "",
                    type: "group",
                    memberCount: selectedChat.members?.length || 0
                });
            } else {
                // Chat 1-1: Tìm người còn lại trong participants
                const partner = selectedChat.participants?.find(p => String(p._id) !== String(user.id));
                setHeaderInfo({
                    name: partner?.username || conversationName || "Người dùng",
                    avatar: partner?.avatar || "",
                    type: "private",
                    status: partner?.status || "offline"
                });
            }
        } catch (err) {
            console.error("Lỗi xử lý header info:", err);
            setHeaderInfo({ name: "Lỗi dữ liệu", type: "error" });
        }
    }, [selectedChat, user]);

    return (
        <ChatContext.Provider value={{ 
            selectedChat, 
            setSelectedChat, 
            headerInfo,
            setHeaderInfo 
        }}>
            {children}
        </ChatContext.Provider>
    );
};

export const useChat = () => useContext(ChatContext);