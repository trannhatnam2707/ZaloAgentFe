import { Avatar, Empty, List, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { getMyConversation } from "../../api/conservation";
import { useChat } from '../../context/ChatContext';
import { useAuth } from '../../../Hooks/useAuth';

const ChatList = () => {
    const [conversations, setConversations] = useState([])
    const [loading, setLoading] = useState(false)

    const { selectedChat, setSelectedChat } = useChat()
    const { user: currentUser } = useAuth()

    useEffect(() => {
        const fetchConversations = async () => {
            try {
                setLoading(true)
                const res = await getMyConversation()
                console.log("debug: ", res)
                setConversations(res || [])
            } catch (err) {
                console.log("Lỗi khi lấy danh sách hội thoại", err)
            } finally {
                setLoading(false)
            }
        }
        fetchConversations()
    }, [])

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", padding: "20px" }}>
                <Spin tip="Đang tải tin nhắn..." />
            </div>
        )
    }

    if (conversations.length === 0) {
        return <Empty description="Chưa có cuộc hội thoại nào" style={{ marginTop: "50px" }} />
    }

    return (
        <div style={{ height: "100%", overflowY: "auto" }}>
            <List
                itemLayout='horizontal'
                dataSource={conversations}
                renderItem={(item) => {
                    const isGroup = item?.type === 'group'
                    const partnerId = item.members?.find(id => String(id) !== String(currentUser?.id));
                    let isActive = false

                    if (isGroup) {
                        // CHỈ bôi đen nhóm nếu selectedChat hiện tại cũng là Group 
                        // và có _id trùng khớp hoàn toàn.
                        isActive = selectedChat?.type === 'group' && String(selectedChat?.id) === String(item.id);
                    } else {
                        // Đối với chat cá nhân, selectedChat.id phải luôn là conversation id.
                        // Dùng partnerId riêng chỉ để phục vụ UI/logic phụ.
                        isActive =
                            selectedChat?.type !== 'group' &&
                            String(selectedChat?.id) === String(item.id);
                    }

                    return (
                        <List.Item
                            style={{
                                cursor: "pointer",
                                padding: "12px 16px",
                                backgroundColor: isActive ? "#e6f7ff" : 'transparent',
                                transition: "background 0.3s"
                            }}
                            className='Chat-item'
                            onClick={() => {
                                if (isGroup) {
                                    // Lưu nguyên object nhóm (bao gồm type: 'group' và _id)
                                    setSelectedChat(item);
                                    console.log("Đang mở chat với nhóm có id:", item.id)

                                } else {
                                    // Giữ nguyên conversation id, bổ sung partnerId để dùng khi cần.
                                    setSelectedChat({ ...item, partnerId });
                                    console.log("Đang mở chat 1-1, conversation id:", item.id, "partner id:", partnerId)
                                }
                            }}
                        >
                            <List.Item.Meta
                                avatar={
                                    <Avatar src={item.avatar}>
                                        {item.conv_name ? item.conv_name.charAt(0).toUpperCase() : "U"}
                                    </Avatar>
                                }
                                title={
                                    <div style={{ display: "flex", justifyContent: 'space-between' }}>
                                        <span style={{ fontWeight: isActive ? "700" : "500" }}>{item.conv_name}</span>
                                        <span style={{ fontSize: "12px", color: "#999" }}>
                                            {item.last_msg_time ? new Date(item.last_msg_time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }) : ""}
                                        </span>
                                    </div>
                                }
                                description={
                                    <div style={{
                                        color: "#888",
                                        fontSize: "13px",
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '200px'
                                    }}>
                                        {item.last_msg || "Chưa có tin nhắn"}
                                    </div>
                                }
                            />
                        </List.Item>
                    )
                }}
            />
        </div>
    )
}

export default ChatList