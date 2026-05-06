import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserOutlined, IdcardOutlined, LockOutlined } from '@ant-design/icons';
import { Form, Alert } from 'antd';
import { useRegister } from '../../Hooks/useRegister';
import AuthLayout from '../components/layout/AuthLayout';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';

const RegisterPage = () => {
    const [form] = Form.useForm();
    const { executeRegister, isLoading, error } = useRegister();

    // Tách đủ 4 State tương ứng với 4 trường
    const [account, setAccount] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [reEnterPassword, setReEnterPassword] = useState('');

    const [localError, setLocalError] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Kiểm tra không bỏ trống bất kỳ ô nào
        if (!account.trim() || !username.trim() || !password || !reEnterPassword) {
            return setLocalError('Vui lòng điền đầy đủ tất cả thông tin!');
        }

        // Kiểm tra mật khẩu khớp nhau`
        if (password !== reEnterPassword) {
            return setLocalError('Mật khẩu nhập lại không trùng khớp!');
        }

        // Gọi Hook và truyền đủ 4 biến
        executeRegister(account.trim(), username.trim(), password, reEnterPassword);
    };

    return (
        <AuthLayout title="Mở Rộng Mạng Lưới" subtitle="Tạo tài khoản ChatAgent ngay hôm nay.">
            <div>
                <h2 className="text-2xl font-bold text-gray-900 mb-1">Đăng ký</h2>
                <p className="text-sm text-gray-500 mb-6">Điền thông tin để bắt đầu hành trình của bạn</p>

                {/* Khung hiển thị lỗi */}
                {(localError || error) && (
                    <Alert
                        message={localError || error}
                        type="error"
                        showIcon
                        className="mb-6"
                    />
                )}

                <Form form={form} layout="vertical" onSubmitCapture={handleSubmit}>
                    {/* Ô 1: Tên đăng nhập (account) */}
                    <FormInput
                        label="Tên đăng nhập (Dùng để login)"
                        type="text"
                        placeholder="Nhập tên đăng nhập viết liền"
                        prefix={<IdcardOutlined className="text-gray-400" />}
                        value={account}
                        onChange={(e) => {
                            setAccount(e.target.value);
                            setLocalError('');
                        }}
                        disabled={isLoading}
                    />

                    {/* Ô 2: Tên hiển thị (username) */}
                    <FormInput
                        label="Tên hiển thị (Tên người dùng)"
                        type="text"
                        placeholder="Nhập tên sẽ hiển thị trên app"
                        prefix={<UserOutlined className="text-gray-400" />}
                        value={username}
                        onChange={(e) => {
                            setUsername(e.target.value);
                            setLocalError('');
                        }}
                        disabled={isLoading}
                    />

                    {/* Ô 3: Mật khẩu */}
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

                    {/* Ô 4: Xác nhận mật khẩu */}
                    <FormInput
                        label="Xác nhận mật khẩu"
                        type="password"
                        placeholder="Nhập lại mật khẩu"
                        prefix={<LockOutlined className="text-gray-400" />}
                        value={reEnterPassword}
                        onChange={(e) => {
                            setReEnterPassword(e.target.value);
                            setLocalError('');
                        }}
                        disabled={isLoading}
                    />

                    <Button
                        htmlType="submit"
                        isLoading={isLoading}
                        className="!h-[44px] w-full !text-[14.5px] hover:!opacity-90 transition-opacity mt-2"
                    >
                        Tạo Tài Khoản Mới
                    </Button>
                </Form>

                <p className="text-center mt-6 text-sm text-gray-500">
                    Đã có tài khoản?{' '}
                    <Link to="/login" className="text-[#0068ff] font-semibold hover:underline">
                        Đăng nhập
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default RegisterPage;