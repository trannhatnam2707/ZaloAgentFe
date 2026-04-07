import React from 'react';
import { Typography } from 'antd';

const { Title, Text } = Typography;

const AuthLayout = ({ title, subtitle, children }) => {
    return (
        <div className="flex h-screen items-center justify-center bg-gray-50">
            {/* Khung trắng đổ bóng mềm mại */}
            <div className="w-full max-w-md bg-white p-8 rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)]">
                
                <div className="text-center mb-8">
                    {/* Màu xanh #0068ff là màu thương hiệu chuẩn của Zalo */}
                    <Title level={2} style={{ color: '#0068ff', margin: 0 }}>{title}</Title>
                    <Text type="secondary" className="text-gray-500">{subtitle}</Text>
                </div>
                
                {children}

            </div>
        </div>
    );
};

export default AuthLayout;