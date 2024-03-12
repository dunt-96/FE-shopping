import { Input } from 'antd'
import React, { useState } from 'react'

const InputForm = ({ props }: any) => {
    const [valueInput, setValueInput] = useState();
    const { placeholder } = props;
    return (
        <Input placeholder={placeholder ?? 'Nhap text'} />
    )
}

export default InputForm