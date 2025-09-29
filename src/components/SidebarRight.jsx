import { Button, Input, Typography } from 'antd'
import React, { useState } from 'react'
import { askAgent } from '../services/ask';

const { Text } = Typography

const SidebarRight = () => {
  
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("")
  const [loading, setLoading] = useState(false)

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
        setLoading(true)
        const res = await askAgent(question)
        setAnswer(res.answer);
        setQuestion("")
    }
    catch
    {
        setAnswer(" Không thể lấy câu trả lời !")
    }
    finally {
        setLoading(false)
    }
  }

  return (
    <div style={{ padding: "15px", display:"flex", flexDirection: "column", height: "100%"}}>
        <Input.TextArea
            placeholder='Nhập câu hỏi của bạn .... '
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            row={3}
        />
        <Button type='primary' onClick={handleAsk} loading={loading} style={{marginTop: "8px"}}>
            Hỏi 
        </Button>

        <div style={{marginTop:"15px", flex: 1, overflowY: "auto"}}>
            <Text strong>
                Câu trả lời cuối cùng:
            </Text>
            <p>{answer}</p>
        </div>
    </div>
  );
};

export default SidebarRight