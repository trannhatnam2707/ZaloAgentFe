import { Button, Input, Typography } from "antd";
import React, { useState } from "react";
import { askAgent } from "../services/ask";
import HeaderBar from "../components/Header"; // import header

const { Text } = Typography;

const ChatBotPage = () => {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAsk = async () => {
    if (!question.trim()) return;
    try {
      setLoading(true);
      const res = await askAgent(question);
      console.log(res);

      // Lấy câu trả lời từ response (chỉ lấy phần sau Final answer:)
      const match = res.answer.split("Final answer:");
      const finalAnswer = match.length > 1 ? match[1].trim() : res.answer;


      setAnswer(finalAnswer);
      setQuestion("");
    } catch (err) {
      console.error("Error asking:", err);
      setAnswer("Không thể lấy câu trả lời!");
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleAsk();
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        width: "100vw", // full màn hình ngang
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
      }}
    >
      {/* Header cố định trên cùng */}
      <HeaderBar />

      {/* Nội dung chat */}
      <div
        style={{
          flex: 1,
          marginTop: "60px", // chừa chỗ cho header
          padding: "20px",
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          width: "100%",
          boxSizing: "border-box",
        }}
      >
        {/* Khung hiển thị câu trả lời */}
        <div
          style={{
            flex: 1,
            display: "flex",
            flexDirection: "column",
            overflowY: "auto",
            border: "1px solid #d9d9d9",
            borderRadius: "6px",
            padding: "12px",
            marginBottom: "15px",
            background: "#fafafa",
            width: "100%",
            boxSizing: "border-box",
          }}
        >
          <Text strong style={{ marginBottom: "10px", display: "block" }}>
            Câu trả lời:
          </Text>
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

        {/* Input + nút gửi */}
        <div style={{ width: "100%", boxSizing: "border-box", display: "flex", gap: "8px"}}>
          <Input.TextArea
            placeholder="Nhập câu hỏi của bạn..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
            style={{ resize: "none", width: "95%" }}
          />
          <Button
            type="primary"
            onClick={handleAsk}
            loading={loading}
            style={{ width: "5%" , height: "50px"}}
            disabled={!question.trim()}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
