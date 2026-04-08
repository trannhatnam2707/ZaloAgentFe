import React from 'react'
import { Button as AntButton } from 'antd'

export const Button = ({ children, isLoading, ...props }) => {
  return (
    <AntButton
      type="primary"
      size="large"
      loading={isLoading}
      block
      style={{
        borderRadius: '10px',
        fontWeight: '600',
        height: '40px',
        background: '#0068ff',
        boxShadow: '0 4px 12px rgba(0,104,255,0.25)',
        border: 'none',
        marginTop: '12px'
      }}
      {...props}
    >
      {children}
    </AntButton>
  );
};
export default Button;