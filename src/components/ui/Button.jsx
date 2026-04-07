import React from 'react'
import { Button as AntButton } from 'antd'

export const Button = ({chidren, isLoading, ...props}) => {
  return (
    <AntButton
        type='primary'
        size='large'
        loading= {isLoading}
        block // cho nút dài ra full width
        style={{ borderRadius: '8px', fontWeight: '600' }}
        {...props}
    >
        {chidren}
    </AntButton>
  )
}
export default Button;