import { useState } from 'react';
import { WrapperInputStyle } from './style';

const InputForm = (props: any) => {
    const [valueInput, setValueInput] = useState();
    const { placeholder, style, type, ...rests } = props;
    return (
        <WrapperInputStyle placeholder={placeholder ?? 'Nhap text'} value={valueInput} style={style} type={type} {...rests} />
    )
}

export default InputForm