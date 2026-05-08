import { List, message, Spin, Avatar} from 'antd';
import React, { useEffect, useState } from 'react'
import { getFriendsList } from '../../api/auth';
import { useChat } from '../../context/ChatContext';


const FriendsList = ({onSelectFriend}) => {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);

    // const {selectedChat} = useChat()

    
    const handleOpenChat = (friend) => {
        if (onSelectFriend)
        {
            onSelectFriend(friend)
        }
    }

    const fetchFriends = async () => {
        try{
            setLoading(true);
            const res = await getFriendsList();
            const list = (res?.friends || [])
            setFriends(list);
            console.log("debug2:", list)
        }
        catch(err)
        {
            message.error("Lấy danh sách bạn bè thất bại")
            console.log("Lỗi khi lấy danh sách bạn bè", err)
        }
        finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchFriends();
    },[])

    if (loading) return <div style={{ textAlign: 'center', padding: '20px' }}><Spin/></div>;
    
    return (
        <div>
            <h3>Danh sách bạn bè ({friends.length})</h3>
            <Spin spinning={loading}>
                <List
                    itemLayout="horizontal"
                    dataSource={friends}
                    renderItem={(item)=> (
                        <List.Item 
                            onClick={() => handleOpenChat(item)}  
                            style={{
                                cursor:"pointer",
                                // backgroundColor: selectedChat?.id === item.id ? '#e6f7ff' : 'transparent',
                                padding: '10px 15px'
                            }}  
                        >
                         <List.Item.Meta
                            avatar={
                                <Avatar src={item.avatar} size={40}>
                                    {item.username?.charAt(0).toUpperCase()}
                                </Avatar>
                            }
                            title={
                                <div style={{
                                    display: "flex",
                                    alignItems: "center",
                                    fontWeight: "500",
                                    // fontWeight: selectedChat?.id === item.id ? 'bold' : 'normal',
                                    height: 40 
                                }}>
                                    {item.display_name || item.username}
                                </div>
                            }
                        />
                        </List.Item>
                    )}
                />
            </Spin>
        </div>
    )
    }

export default FriendsList