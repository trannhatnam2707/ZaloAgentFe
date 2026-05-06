import { List, message, Spin, Avatar} from 'antd';
import React, { useEffect, useState } from 'react'
import { getFriendsList } from '../../api/auth';


const FriendsList = ({onSelectFriend}) => {

    const [friends, setFriends] = useState([]);
    const [loading, setLoading] = useState(false);
    
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
            console.log("debug2:", friends)
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
                            style={{cursor:"pointer"}}  
                        >
                            <List.Item.Meta
                                avatar={<Avatar src={item.avatar}>{item.username?.charAt(0).toUpperCase()}</Avatar>}
                                title={item.display_name || item.username}
                            />
                        </List.Item>
                    )}
                />
            </Spin>
        </div>
    )
    }

export default FriendsList