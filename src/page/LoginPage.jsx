import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Form, message } from 'antd';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; // Thêm icon cho đẹp

import { useLogin } from '../../Hooks/useLogin'; // Dùng chuẩn file hook bạn vừa viết
import AuthLayout from '../components/layout/AuthLayout';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button'

const LoginPage = () => {
    const { executeLogin, isLoading, error } = useLogin();
    
    // Đồ nghề hiện thông báo (Toast) cực xịn của thư viện
    const [messageApi, contextHolder] = message.useMessage();

    // Lắng nghe: Cứ khi nào hook báo có lỗi -> Bắn popup lỗi ra góc trên màn hình
    useEffect(() => {
        if (error) {
            messageApi.error(error);
        }
    }, [error, messageApi]);

    // Hàm này CHỈ CHẠY khi user đã điền đầy đủ dữ liệu không vi phạm rules
    const onFinish = (values) => {
        // values lúc này là 1 object có sẵn: { username: "...", password: "..." }
        executeLogin(values.username, values.password);
    };

    return (
        <AuthLayout title="Zalo Clone" subtitle="Đăng nhập để kết nối với bạn bè">
            {contextHolder} {/* Khai báo để thư viện biết chỗ vẽ popup lỗi */}

            <Form
                name="login_form"
                layout="vertical"
                onFinish={onFinish}
                requiredMark={false} // Tắt dấu sao đỏ xấu xí mặc định
            >
                <FormInput 
                    label="Tài khoản" 
                    name="username" 
                    prefix={<UserOutlined className="text-gray-400" />}
                    placeholder="Nhập username" 
                    rules={[{ required: true, message: 'Vui lòng nhập tài khoản!' }]} 
                />
                
                <FormInput 
                    label="Mật khẩu" 
                    name="password" 
                    type="password" 
                    prefix={<LockOutlined className="text-gray-400" />}
                    placeholder="••••••••" 
                    rules={[{ required: true, message: 'Vui lòng nhập mật khẩu!' }]} 
                />

                <Form.Item className="mt-6 mb-0">
                    {/* Nút bấm tự động biến thành nút Submit của form */}
                    <Button htmlType="submit" isLoading={isLoading}>
                        Đăng Nhập
                    </Button>
                </Form.Item>
            </Form>

            <div className="text-center mt-6">
                <span className="text-gray-500">Chưa có tài khoản? </span>
                <Link to="/register" className="text-[#0068ff] font-semibold hover:underline">
                    Đăng ký ngay
                </Link>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;