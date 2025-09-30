import { Button, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { askAgent } from '../services/ask';

const { Text } = Typography

const SidebarRight = () => {
  
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) {
      return;
    }
    try {
        setLoading(true)
        const res = await askAgent(question)
        setAnswer(res.answer);
        setQuestion("")
    }
    catch (err) {
        console.error("Error asking:", err)
        setAnswer("Không thể lấy câu trả lời!")
    }
    finally {
        setLoading(false)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  }

  return (
    <div style={{ 
      padding: "15px", 
      display:"flex", 
      flexDirection: "column", 
      height: "100%",
      gap: "10px"
    }}>
      <div>
        <Input.TextArea
          placeholder='Nhập câu hỏi của bạn...'
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          onKeyPress={handleKeyPress}
          rows={3}
          style={{ resize: 'none' }}
        />
        <Button 
          type='primary' 
          onClick={handleAsk} 
          loading={loading} 
          style={{ marginTop: "8px", width: "100%" }}
          disabled={!question.trim()}
        >
          Hỏi 
        </Button>
      </div>

      <div style={{ 
        flex: 1, 
        display: "flex", 
        flexDirection: "column",
        minHeight: 0
      }}>
        <Text strong style={{ marginBottom: "10px", display: "block" }}>
          Câu trả lời:
        </Text>
        <div style={{
          flex: 1,
          overflowY: "auto",
          padding: "12px",
          background: "#f5f5f5",
          borderRadius: "6px",
          border: "1px solid #d9d9d9"
        }}>
          {answer ? (
            <div style={{ whiteSpace: "pre-wrap", wordBreak: "break-word" }}>
              {answer}
            </div>
          ) : (
            <Text type="secondary" style={{ fontStyle: "italic" }}>
              Chưa có câu trả lời...
            </Text>
          )}
        </div>
      </div>
    </div>
  );
};

export default SidebarRight