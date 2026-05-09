import React, { useState, useEffect, useRef } from "react";
import ChatHeader from "../ChatHeader";
import ChatInput from "../ChatInput";
import MessageItem from "../MessageItem";
import { useChat } from "../../../context/ChatContext";
import { getMessageHistory } from "../../../api/messages";
import { getReportsByConversation } from "../../../api/reports";

const CenterLayout = () => {
    const { selectedChat, headerInfo } = useChat();
    const [messages, setMessages] = useState([]);
    const [reports, setReports] = useState([]);
    const [loading, setLoading] = useState(false);
    const [errorMsg, setErrorMsg] = useState(null); // Quản lý lỗi truy cập
    const messagesEndRef = useRef(null);

    const normalizeList = (payload, candidates = []) => {
        if (Array.isArray(payload)) return payload;
        if (!payload || typeof payload !== "object") return [];

        for (const key of candidates) {
            if (Array.isArray(payload[key])) return payload[key];
        }

        if (Array.isArray(payload.data)) return payload.data;
        return [];
    };

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    const fetchData = async () => {
        if (!selectedChat?.id) return;
        
        setLoading(true);
        setErrorMsg(null);
        try {
            // Gọi song song để tối ưu
            const [msgData, reportData] = await Promise.all([
                getMessageHistory(selectedChat.id),
                getReportsByConversation(selectedChat.id)
            ]);

            const normalizedMessages = normalizeList(msgData, ["messages", "items", "results"]);
            const normalizedReports = normalizeList(reportData, ["reports", "items", "results"]);

            setMessages(normalizedMessages);
            setReports(normalizedReports);

            console.log("message payload:", msgData);
            console.log("report payload:", reportData);
        } catch (error) {
            console.error("Lỗi tải dữ liệu:", error);
            if (error.response?.status === 403) {
                setErrorMsg("Bạn không có quyền xem cuộc hội thoại này.");
            } else {
                setErrorMsg("Đã xảy ra lỗi khi tải tin nhắn.");
            }
            setMessages([]);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, [selectedChat?.id]);

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // 1. Trường hợp chưa chọn hội thoại
    if (!selectedChat) {
        return (
            <div style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", background: "#f9fafb", color: "#9ca3af" }}>
                <p>Hãy chọn một cuộc hội thoại để làm việc</p>
            </div>
        );
    }

    return (
        <div style={{ flex: 1, width: "100%", height: "100%", display: "flex", flexDirection: "column", background: "#fff", overflow: "hidden", position: "relative" }}>
            {/* Header: Nếu headerInfo chưa có (null), hiện skeleton hoặc tên tạm */}
            <ChatHeader info={headerInfo || { name: "Đang tải...", type: "loading" }} />

            <div style={{ flex: 1, overflowY: "auto", padding: "16px" }}>
                {errorMsg ? (
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", height: "100%", color: "#ef4444" }}>
                        <div style={{ background: "#fef2f2", padding: "16px", borderRadius: "8px", border: "1px solid #fecaca" }}>
                            {errorMsg}
                        </div>
                    </div>
                ) : loading && messages.length === 0 ? (
                    <div style={{ display: "flex", justifyContent: "center", padding: "40px 0" }}>Đang tải tin nhắn...</div>
                ) : (
                    <>
                        {/* Danh sách báo cáo nổi bật */}
                        {reports.length > 0 && (
                            <div style={{ background: "#fffbeb", padding: "12px", borderRadius: "6px", border: "1px solid #fde68a", color: "#92400e", fontSize: "12px", marginBottom: "8px" }}>
                                📢 Hội thoại này có {reports.length} báo cáo công việc.
                            </div>
                        )}

                        {/* Danh sách tin nhắn */}
                        {messages.length > 0 ? (
                            messages.map((msg) => (
                                <MessageItem key={msg._id || Math.random()} message={msg} />
                            ))
                        ) : (
                            <div style={{ textAlign: "center", color: "#d1d5db", padding: "40px 0", fontStyle: "italic" }}>Chưa có tin nhắn nào</div>
                        )}
                        <div ref={messagesEndRef} />
                    </>
                )}
            </div>

            {/* Chỉ hiện Input nếu không bị lỗi quyền truy cập */}
            {!errorMsg && (
                <ChatInput 
                    conversationId={selectedChat.id} 
                    onRefresh={fetchData} 
                />
            )}
        </div>
    );
};

export default CenterLayout;