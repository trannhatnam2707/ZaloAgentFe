
import React, { useCallback, useEffect, useState } from 'react'
import { useChat } from '../../../context/ChatContext'
import { Spin } from 'antd'
import { getAllReports } from '../../../api/reports'
import { getMessageHistory } from '../../../api/messages'
import ChatHeader from '../ChatHeader'
import ChatInput from '../ChatInput'
import MessageItem from '../MessageItem'

const CenterLayout = () => {

  const { selectedChat, setHeaderInfo } = useChat()
  const [messages, setMessages] = useState([])

  const fetchMessage = useCallback( async () => {

    const conversationId = selectedChat?._id || selectedChat?.id
    if(!conversationId) return 

      try{
        const [resMessage, resReport] = await Promise.all([
          getAllReports(conversationId),
          getMessageHistory(conversationId)
        ])
        console.log("getReport: ", resReport),
        console.log("getReport: ", resMessage)

        // Gộp 2 mảng lại thành một
        // Lưu ý: reportRes nên được đánh dấu type để MessageItem dễ phân biệt
        const allData = [
          ...(resMessage || []).map(m => ({ ...m, type: 'text', created_at: m.created_at })),
          ...(resReport || []).map(r => ({ ...r, type: 'report_card', created_at: r.created_at }))
        ];

        // Sắp xếp theo thời gian (từ cũ đến mới)
        allData.sort((a,b) => new Date(a.created_at) - new Date(b.created_at))

        setMessages(allData)
        console.log("logMessage: ",messages)
      }
      catch(err){
        console.error("Lỗi lấy dữ liệu: ", err)
      }
  }, [selectedChat])

  useEffect(() => {
      if(selectedChat){
         setHeaderInfo({
            title : selectedChat.conv_name || selectedChat.username,
            avatar : selectedChat.avatar,
            type : selectedChat.type,
            id : selectedChat.id || selectedChat._id
         })
        fetchMessage()
      }
  },[selectedChat])



  return (
    <div style={{flex: 1, display: 'flex', flexDirection:"column", height: "100%"}}>
        {/* Header */}
        <ChatHeader/>

        {/* Message */}
        <div style={{flex:"1", overflowY:"auto", padding:"20px", backgroundColor:"#f5f5f5"}}>
            {messages.map((msg) => (
                <MessageItem key={msg.id} message={msg}/>
            ))}
        </div>

        {/* inputMessage */}
        <div>
        <ChatInput conversationId={selectedChat?._id || selectedChat?.id} onRefresh={fetchMessage} />
        </div>

    </div>
  )
}

export default CenterLayout