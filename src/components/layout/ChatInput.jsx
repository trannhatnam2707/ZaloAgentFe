import React, { useState } from 'react';
import { Input, Button } from 'antd';
import { SendOutlined } from '@ant-design/icons';
import { sendMessage } from '../../api/messages';

const ChatInput = ({conversationId, onRefresh}) => {
  const [text, setText] = useState('');
  const [sending, setSending] = useState(false);

  const handleSend = async () => {
    if (!text.trim() || sending) return;

    try {
        setSending(true);
        
        // CHỈ GỬI NỘI DUNG THUẦN
        // Backend sẽ tự phân tích content để quyết định type là "text" hay "report_card"
        await sendMessage({
            conversation_id: conversationId,
            content: text.trim(), 
            // Bỏ trường type hoặc để Backend làm default
        });

        setText('');
        if (onRefresh) onRefresh();
    } catch (err) {
        console.error("Lỗi gửi tin nhắn:", err);
    } finally {
        setSending(false);
    }
};

return (
  <div style={{ padding: '15px', borderTop: '1px solid #f0f0f0', display: 'flex', gap: '10px', backgroundColor: '#fff' }}>
      <Input.TextArea 
          placeholder="Nhập tin nhắn hoặc 'report' để báo cáo..." 
          autoSize={{ minRows: 1, maxRows: 4 }}
          value={text}
          onChange={(e) => setText(e.target.value)}
          onPressEnter={(e) => {
              if (!e.shiftKey) {
                  e.preventDefault();
                  handleSend();
              }
          }}
          style={{ borderRadius: '10px' }}
      />
      <Button 
          type="primary" 
          shape="circle" 
          icon={<SendOutlined />} 
          onClick={handleSend}
          loading={sending}
      />
  </div>
);
}

export default ChatInput