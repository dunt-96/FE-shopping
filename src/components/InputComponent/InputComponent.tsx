import { Input } from 'antd'
import React from 'react'

const InputComponent = (props: any) => {
    const { size, placeholder, backgroundInputColor } = props;
    return (
        <Input
            size={size}
            bordered={false}
            placeholder={placeholder}
            style={{ backgroundColor: backgroundInputColor, borderRadius: '5px 0 0 5px' }}
        />
    )
}

export default InputComponent