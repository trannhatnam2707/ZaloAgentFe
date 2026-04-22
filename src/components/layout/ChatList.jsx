import { Avatar, Empty, List, Spin } from 'antd'
import React, { useEffect, useState } from 'react'
import {getMyConversation} from "../../api/conservation"

const ChatList = () => {

  const [conversations, setConversations] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const fetchConversations = async () => {
        try{
            setLoading(true)
            const res = await getMyConversation()
            setConversations(res || [])
            console.log("debug:", res)
        }
        catch(err)
        {
            console.log("Lỗi khi lấy danh sách hội thoại", err)
        }
        finally {
            setLoading(false)
        }
    }
   fetchConversations()
  },[])

  if(loading) {
    return (
        <div style={{display:"flex", justifyContent:"center", padding:"20px"}}>
            <Spin tip="Đang tải tin nhắn ..."/>
        </div>
    )
  }

  if (conversations.length == 0) {
     return <Empty description="Chưa có cuộc hội thoại nào" style={{marginTop:"50px"}}></Empty>
  }

  return (
    <div style={{height: "100%", overflowY:"auto"}}>
        <List
            itemLayout='horizontal'
            dataSource={conversations}
            renderItem={(item) => (
                <List.Item
                    style={{
                        cursor:"pointer",
                        padding: "12px 16px",
                        transition:"background 0.3s"
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = "#f5f5f5"}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor ="transparent"}
                    onClick={() => console.log("Chọn hội thoại", item.id)}
                >
                    <List.Item.Meta
                        avatar = {
                            <Avatar src={item.avatar}>
                                {item.conv_name ? item.conv_name.charAt(0).toUpperCase() :  "U" }
                            </Avatar>
                        }
                        title={
                            <div style={{display:"flex", justifyContent:'space-between'}}>
                                <span style={{fontSize:"600"}}>{item.conv_name}</span>
                                <span style={{fontSize:"12px", color:"#999"}}>
                                    {item.last_msg_time ? new Date(item.last_msg_time).toLocaleTimeString([],{hour: '2-digit', minute:'2-digit'}) : ""}
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
            )}
        >

        </List>
    </div>
  )
}

export default ChatList