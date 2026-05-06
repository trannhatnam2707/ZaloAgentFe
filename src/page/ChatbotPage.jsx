
import { Button, Input, Spin } from "antd";
import React, { useState, useRef, useEffect } from "react";
import { askAgent, clearChatHistory } from "../services/ask";
import HeaderBar from "../components/Header";
import { SendOutlined } from "@ant-design/icons";

const ChatBotPage = () => {
  const [question, setQuestion] = useState("");
  const [messages, setMessages] = useState([]); // Không load từ đâu cả
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Xóa lịch sử backend khi component mount (reload trang)
  useEffect(() => {
    const username = localStorage.getItem("username");
    if (username) {
      // Xóa session backend khi reload trang
      clearChatHistory(username).catch(err => {
        console.error("Error clearing backend history:", err);
      });
    }
  }, []); // Chỉ chạy 1 lần khi mount

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleAsk = async () => {
    if (!question.trim()) return;

    const username = localStorage.getItem("username");
    if (!username) {
      setMessages(prev => [...prev, {
        type: "error",
        content: "⚠ Không tìm thấy thông tin đăng nhập. Vui lòng đăng nhập lại.",
        timestamp: new Date()
      }]);
      return;
    }

    // Thêm câu hỏi của user vào chat
    const userMessage = {
      type: "user",
      content: question,
      timestamp: new Date()
    };
    setMessages(prev => [...prev, userMessage]);
    setQuestion(""); // Xóa input ngay sau khi gửi

    try {
      setLoading(true);
      
      const res = await askAgent(question, username);
      console.log(res);

      // Lấy câu trả lời từ response
      const match = res.answer.split("Final answer:");
      const finalAnswer = match.length > 1 ? match[1].trim() : res.answer;

      // Thêm câu trả lời của bot vào chat
      const botMessage = {
        type: "bot",
        content: finalAnswer,
        timestamp: new Date()
      };
      setMessages(prev => [...prev, botMessage]);
    } catch (err) {
      console.error("Error asking:", err);
      
      // Thêm thông báo lỗi vào chat
      const errorMessage = {
        type: "error",
        content: "⚠ Không thể lấy câu trả lời! Vui lòng thử lại.",
        timestamp: new Date()
      };
      setMessages(prev => [...prev, errorMessage]);
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
        width: "100vw",
        display: "flex",
        flexDirection: "column",
        margin: 0,
        padding: 0,
        boxSizing: "border-box",
        background: "#f5f5f5",
        overflow: "hidden", // ← FIX 1: Ngăn scroll toàn trang
      }}
    >
      <HeaderBar />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          background: "#fff",
          width: "100%",
          maxWidth: "1200px",
          margin: "60px auto 0 auto",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          boxSizing: "border-box",
          overflow: "hidden", // ← FIX 1: Ngăn scroll container
        }}
      >
        {/* Khung hiển thị chat */}
        <div
          style={{
            flex: 1,
            overflowY: "auto",
            overflowX: "hidden", // ← FIX 2: Ngăn scroll ngang
            padding: "20px",
            display: "flex",
            flexDirection: "column",
            gap: "12px",
            background: "#fafafa",
          }}
        >
          {messages.length === 0 ? (
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                height: "100%",
                color: "#999",
                fontSize: "16px",
              }}
            >
              👋 Xin chào! Hãy đặt câu hỏi để bắt đầu trò chuyện...
            </div>
          ) : (
            messages.map((msg, index) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  justifyContent: msg.type === "user" ? "flex-end" : "flex-start",
                  alignItems: "flex-start",
                  marginBottom: "8px",
                }}
              >
                {msg.type === "bot" && (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#1677ff",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      marginRight: "8px",
                      flexShrink: 0,
                    }}
                  >
                    AI
                  </div>
                )}

                <div
                  style={{
                    maxWidth: "70%",
                    padding: "12px 16px",
                    borderRadius: "12px",
                    background: msg.type === "user" 
                      ? "#1677ff" 
                      : msg.type === "error" 
                      ? "#ff4d4f" 
                      : "#fff",
                    color: msg.type === "user" || msg.type === "error" ? "#fff" : "#000",
                    boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                    wordBreak: "break-word",
                    whiteSpace: "pre-wrap",
                  }}
                >
                  {msg.content}
                </div>

                {msg.type === "user" && (
                  <div
                    style={{
                      width: "36px",
                      height: "36px",
                      borderRadius: "50%",
                      background: "#52c41a",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: "#fff",
                      fontWeight: "bold",
                      marginLeft: "8px",
                      flexShrink: 0,
                    }}
                  >
                    {localStorage.getItem("username")?.charAt(0).toUpperCase() || "U"}
                  </div>
                )}
              </div>
            ))
          )}

          {/* Hiển thị loading khi đang chờ bot trả lời */}
          {loading && (
            <div
              style={{
                display: "flex",
                justifyContent: "flex-start",
                alignItems: "center",
                gap: "8px",
              }}
            >
              <div
                style={{
                  width: "36px",
                  height: "36px",
                  borderRadius: "50%",
                  background: "#1677ff",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  color: "#fff",
                  fontWeight: "bold",
                }}
              >
                AI
              </div>
              <div
                style={{
                  padding: "12px 16px",
                  borderRadius: "12px",
                  background: "#fff",
                  boxShadow: "0 1px 2px rgba(0,0,0,0.1)",
                }}
              >
                <Spin size="small" />
                <span style={{ marginLeft: "8px" }}>Đang suy nghĩ...</span>
              </div>
            </div>
          )}

          {/* Scroll anchor */}
          <div ref={messagesEndRef} />
        </div>

        {/* Input + nút gửi */}
        <div
          style={{
            padding: "16px 20px",
            borderTop: "1px solid #f0f0f0",
            background: "#fff",
            display: "flex",
            gap: "12px",
            alignItems: "flex-end",
          }}
        >
          <Input.TextArea
            placeholder="Nhập câu hỏi của bạn..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyPress={handleKeyPress}
            rows={2}
            style={{
              resize: "none",
              flex: 1,
              borderRadius: "8px",
            }}
            disabled={loading}
          />
          <Button
            type="primary"
            onClick={handleAsk}
            loading={loading}
            icon={<SendOutlined />}
            style={{
              height: "50px",
              width: "80px",
              borderRadius: "8px",
            }}
            disabled={!question.trim() || loading}
          >
            Gửi
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ChatBotPage;
