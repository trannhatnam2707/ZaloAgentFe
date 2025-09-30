import { Card, Form, Input, Button, message, Typography } from 'antd'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { login } from '../services/auth'

const { Title } = Typography

const LoginPage = () => {
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    try{
        setLoading(true)
        const res = await login(values.username, values.password)

        message.success("Đăng nhập thành công")
        
        // Force reload để App.jsx re-check authentication
        window.location.href = "/"
    }
    catch (err)
    {
        console.error("Login error: ", err)
        message.error(err?.response?.data?.detail || "Sai tài khoản hoặc mật khẩu")
    }
    finally {
        setLoading(false)
    }
  }

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
                Đăng Nhập
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
                    Đăng nhập
                </Button>
                <Button
                    type="link"
                    block
                    onClick={() => navigate("/register")}
                    style={{ marginTop: "10px" }}
                >
                    Chưa có tài khoản? Đăng ký
                </Button>
            </Form>
        </Card>
    </div>
  )
}

export default LoginPage