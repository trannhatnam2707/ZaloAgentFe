import React from 'react';
import { Form, Input as AntInput } from 'antd';

// Đây là một wrapper "thông minh". Nó bọc cả Form.Item lẫn Input.
const FormInput = ({ label, name, rules, type = 'text', prefix, placeholder, ...props }) => {
    return (
        <Form.Item label={label} name={name} rules={rules}>
            {/* Nếu là password thì dùng component gõ mật khẩu (tự có con mắt ẩn/hiện) */}
            {type === 'password' ? (
                <AntInput.Password prefix={prefix} placeholder={placeholder} size="large" {...props} />
            ) : (
                <AntInput prefix={prefix} placeholder={placeholder} size="large" {...props} />
            )}
        </Form.Item>
    );
};

export default FormInput;