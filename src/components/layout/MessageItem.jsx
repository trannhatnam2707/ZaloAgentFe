import { Typography, Card, Tag } from 'antd'
import React from 'react'
import { useAuth } from '../../../Hooks/useAuth'

const {Text} = Typography

const MessageItem = ({ message }) => {

  const { user: currentUser} = useAuth()

  // Kiểm tra xem tin nhắn có phải của chính mình gửi không
  const isMine = String(message.sender.id) === String(currentUser.id)
  
  // Giao diện cho Report
  if (message.type === 'report' ) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', margin: '15px 0' }}>
          <Card 
              size="small"
              style={{ 
                  width: '85%', 
                  borderRadius: '8px', 
                  border: '1px solid #d9d9d9',
                  backgroundColor: '#fafafa'
              }}
          >
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                  <Tag color="processing">BÁO CÁO NGÀY {message.date || new Date(message.created_at).toLocaleDateString('vi-VN')}</Tag>
                  <Text type="secondary" style={{ fontSize: '11px' }}>{message.user_name || "Thành viên"}</Text>
              </div>
              
              {/* Hiển thị nội dung công việc thuần túy, phân tách bằng xuống dòng hoặc Divider */}
              <div style={{ padding: '4px 0' }}>
                  <div style={{ marginBottom: '8px' }}>
                      <Text>{message.yesterday || message.metadata?.yesterday}</Text>
                  </div>
                  <div style={{ borderTop: '1px dashed #f0f0f0', margin: '8px 0' }}></div>
                  <div>
                      <Text>{message.today || message.metadata?.today}</Text>
                  </div>
              </div>
          </Card>
      </div>
  );
}
  // Giao diện cho tin nhắn thường
  return (
    <div style={{ 
        display: 'flex', 
        justifyContent: isMine ? 'flex-end' : 'flex-start',
        marginBottom: '10px'
    }}>
        <div style={{ 
            maxWidth: '70%', 
            padding: '8px 14px', 
            borderRadius: '15px',
            backgroundColor: isMine ? '#0084ff' : '#e4e6eb',
            color: isMine ? '#fff' : '#000'
        }}>
            <div>{message.content}</div>
            <div style={{ fontSize: '10px', opacity: 0.6, textAlign: 'right', marginTop: '2px' }}>
                {new Date(message.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
            </div>
        </div>
    </div>
);
}

export default MessageItem