import { CheckOutlined, CloseOutlined } from '@ant-design/icons';
import { Avatar, Button, Empty, List, message, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { getFriendsList, acceptFriendRequest, removeFriendOrRequest } from '../../api/auth';

const FriendsRequestList = () => {
    const [requests, setRequests] = useState([]);
    const [loading, setLoading] = useState(false);

    const fetchRequest = async () => {
        try {
            setLoading(true);
            const res = await getFriendsList(); 
            // Lọc status pending
            const pendingRequests = (res || []).filter(item => item.status === "pending");
            setRequests(pendingRequests);
        } catch (err) {
            message.error("Lấy danh sách thất bại");
            console.log("Lỗi lấy lời mời: ", err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRequest();
    }, []);

    const handleAccept = async (id) => {
        try {
            await acceptFriendRequest(id);
            message.success("Đã đồng ý kết bạn!");
            fetchRequest(); 
        } catch (err) {
            message.error("Thao tác thất bại!");
        }
    };

    const handleDecline = async (id) => {
        try {
            await removeFriendOrRequest(id);
            message.info("Đã từ chối lời mời.");
            fetchRequest();
        } catch (err) {
            message.error("Thao tác thất bại!");
        }
    };

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin /></div>;

    return (
        <div style={{ height: "100%", overflowY: "auto" }}>
            <List
                itemLayout="horizontal"
                dataSource={requests}
                locale={{ emptyText: <Empty description="Không có lời mời nào" /> }}
                renderItem={(item) => ( 
                    <List.Item
                        style={{ padding: '12px 16px' }}
                        actions={[
                            <Button
                                type='primary'
                                shape='circle'
                                icon={<CheckOutlined />}
                                onClick={() => handleAccept(item.id || item._id)}
                            />,
                            <Button
                                danger // Nên để màu đỏ cho nút từ chối
                                shape='circle'
                                icon={<CloseOutlined />}
                                onClick={() => handleDecline(item.id || item._id)}
                            />,
                        ]}
                    >
                        <List.Item.Meta
                            avatar={<Avatar src={item.avatar}>{item.username?.charAt(0).toUpperCase()}</Avatar>}
                            title={item.display_name || item.username}
                            description="Muốn kết bạn với bạn"
                        />
                    </List.Item>
                )}
            />
        </div>
    );
};

export default FriendsRequestList;