import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, LockOutlined } from '@ant-design/icons'; 
import { Alert } from 'antd';
import { useLogin } from '../../Hooks/useLogin'; 
import AuthLayout from '../components/layout/AuthLayout';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button'; // Import cục Button siêu đẹp của bạn vào đây

const LoginPage = () => {
    const { executeLogin, isLoading, error } = useLogin();
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);
    
    const [localError, setLocalError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        setLocalError('');
        
        if (!username.trim() || !password) {
            return setLocalError('Vui lòng nhập đầy đủ tài khoản và mật khẩu!');
        }
         
        executeLogin(username.trim(), password, remember);
    };

    return (
        <AuthLayout title="ChatAgent" subtitle="Kết nối, chia sẻ và trải nghiệm cùng bạn bè mọi lúc mọi nơi.">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Đăng nhập</h2>
                <p className="text-sm text-gray-500 mb-6">Nhập thông tin tài khoản của bạn để tiếp tục</p>

                {/* Khung Báo Lỗi */}
                {(localError || error) && (
                    <div className="mb-6">
                        <Alert
                            message={localError || error}
                            type="error"
                            showIcon
                        />
                    </div>
                )}

                <form onSubmit={handleSubmit}>
                    <FormInput
                        label="Tài khoản"
                        type="text"
                        placeholder="Nhập username hoặc email"
                        prefix={<UserOutlined className="text-gray-400" />}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setLocalError(''); 
                        }}
                        disabled={isLoading}
                    />

                    <FormInput
                        label="Mật khẩu"
                        type="password"
                        placeholder="••••••••"
                        prefix={<LockOutlined className="text-gray-400" />}
                        value={password}
                        onChange={(e) => {
                            setPassword(e.target.value);
                            setLocalError('');
                        }}
                        disabled={isLoading}
                    />

                    <div className="flex items-center justify-between my-5 text-sm">
                        <label className="flex items-center gap-2 cursor-pointer text-gray-600 hover:text-gray-900 select-none">
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={(e) => setRemember(e.target.checked)}
                                disabled={isLoading}
                                className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 cursor-pointer"
                            />
                            Ghi nhớ đăng nhập
                        </label>
                    </div>

                    <Button htmlType="submit" isLoading={isLoading} >
                        Đăng Nhập
                    </Button>
                </form>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Chưa có tài khoản?{' '}
                    <Link to="/register" className="text-[#0068ff] font-semibold hover:underline">
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </AuthLayout>
        // </div>
    );
};

export default LoginPage;