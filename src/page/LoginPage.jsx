import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import { useLogin } from '../../Hooks/useLogin';
import AuthLayout from '../components/layout/AuthLayout';
import FormInput from '../components/ui/FormInput';
import Button from '../components/ui/Button';

const UserIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"/>
        <circle cx="12" cy="7" r="4"/>
    </svg>
);

const LockIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="3" y="11" width="18" height="11" rx="2"/>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"/>
    </svg>
);

const AlertIcon = () => (
    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: '1px' }}>
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12.01" y2="16"/>
    </svg>
);

const LoginPage = () => {
    const { executeLogin, isLoading, error } = useLogin();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [remember, setRemember] = useState(false);

    const [errors, setErrors] = useState({ username: '', password: '' });

    // Reset lỗi inline khi user bắt đầu gõ lại
    useEffect(() => {
        if (username) setErrors(prev => ({ ...prev, username: '' }));
    }, [username]);

    useEffect(() => {
        if (password) setErrors(prev => ({ ...prev, password: '' }));
    }, [password]);

    const validate = () => {
        const next = { username: '', password: '' };
        if (!username.trim()) next.username = 'Vui lòng nhập tài khoản';
        if (!password) next.password = 'Vui lòng nhập mật khẩu';
        setErrors(next);
        return !next.username && !next.password;
    };

    const handleSubmit = (e) => {
        e?.preventDefault();
        if (!validate()) return;
        executeLogin(username.trim(), password, remember);
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') handleSubmit();
    };

    return (
        <AuthLayout
            title="ChatAgent"
            subtitle="Kết nối, chia sẻ và trải nghiệm cùng bạn bè mọi lúc mọi nơi."
        >
            <div>
                <h2 style={{ fontSize: '20px', fontWeight: 600, color: '#1a1a1a', marginBottom: '4px' }}>
                    Đăng nhập
                </h2>
                <p style={{ fontSize: '13px', color: '#888', marginBottom: '24px' }}>
                    Nhập thông tin tài khoản của bạn để tiếp tục
                </p>

                {/* Banner lỗi từ server */}
                {error && (
                    <div style={{
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '8px',
                        background: '#fff2f2',
                        border: '1px solid #ffc9c9',
                        borderRadius: '8px',
                        padding: '10px 13px',
                        marginBottom: '16px',
                        fontSize: '13px',
                        color: '#c0392b',
                        lineHeight: 1.5,
                    }}>
                        <AlertIcon />
                        <span>{error}</span>
                    </div>
                )}

                <form onSubmit={handleSubmit} noValidate>
                    <FormInput
                        label="Tài khoản"
                        name="username"
                        type="text"
                        prefix={<UserIcon />}
                        placeholder="Nhập username"
                        value={username}
                        onChange={e => setUsername(e.target.value)}
                        error={errors.username}
                        disabled={isLoading}
                    />

                    <FormInput
                        label="Mật khẩu"
                        name="password"
                        type="password"
                        prefix={<LockIcon />}
                        placeholder="••••••••"
                        value={password}
                        onChange={e => setPassword(e.target.value)}
                        onKeyDown={handleKeyDown}
                        error={errors.password}
                        disabled={isLoading}
                    />

                    {/* Remember me + Forgot password */}
                    <div style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        margin: '4px 0 22px',
                    }}>
                        <label style={{
                            display: 'flex',
                            alignItems: 'center',
                            gap: '7px',
                            cursor: 'pointer',
                            fontSize: '13px',
                            color: '#555',
                            userSelect: 'none',
                        }}>
                            <input
                                type="checkbox"
                                checked={remember}
                                onChange={e => setRemember(e.target.checked)}
                                disabled={isLoading}
                                style={{ accentColor: '#0068ff', width: '15px', height: '15px', cursor: 'pointer' }}
                            />
                            Ghi nhớ đăng nhập
                        </label>

                        <Link
                            to="/forgot-password"
                            style={{ fontSize: '13px', color: '#0068ff', textDecoration: 'none', fontWeight: 500 }}
                        >
                            Quên mật khẩu?
                        </Link>
                    </div>

                    <Button type="submit" isLoading={isLoading}>
                        Đăng nhập
                    </Button>
                </form>

                <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '13px', color: '#888' }}>
                    Chưa có tài khoản?{' '}
                    <Link
                        to="/register"
                        style={{ color: '#0068ff', fontWeight: 600, textDecoration: 'none' }}
                    >
                        Đăng ký ngay
                    </Link>
                </p>
            </div>
        </AuthLayout>
    );
};

export default LoginPage;