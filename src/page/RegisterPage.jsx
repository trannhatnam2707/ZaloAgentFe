import React, { useState } from "react";
import { Card, Form, Input, Button, Typography, message } from "antd";
import { useNavigate } from "react-router-dom";
import { register } from "../services/auth";

const { Title } = Typography;

const RegisterPage = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    try {
      setLoading(true);
      const res = await register(values.username, values.password);

      message.success("Đăng ký thành công!");
      // Sau khi đăng ký xong thì điều hướng về Login
      navigate("/login");
    } catch (err) {
      console.error("Register error:", err);
      message.error(err?.response?.data?.detail || "Không thể đăng ký");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "linear-gradient(135deg, #74ebd5 0%, #ACB6E5 100%)",
        margin: 0,
        padding: 0
      }}
    >
      <Card 
        style={{ 
          width: 400, 
          padding: 20, 
          borderRadius: 12,
          boxShadow: "0 8px 16px rgba(0,0,0,0.1)"
        }}
      >
        <Title level={3} style={{ textAlign: "center", marginBottom: "20px" }}>
          Đăng Ký
        </Title>
        <Form layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Tên đăng nhập"
            name="username"
            rules={[{ required: true, message: "Vui lòng nhập username" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Vui lòng nhập mật khẩu" }]}
          >
            <Input.Password />
          </Form.Item>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Đăng ký
          </Button>
          <Button
            type="link"
            block
            onClick={() => navigate("/login")}
            style={{ marginTop: "10px" }}
          >
            Đã có tài khoản? Đăng nhập
          </Button>
        </Form>
      </Card>
    </div>
  );
};

export default RegisterPage;