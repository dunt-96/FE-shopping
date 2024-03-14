import { WrapperInputStyle } from './style';

const InputForm = (props: any) => {
    const { placeholder, style, type, ...rests } = props;
    const handleOnchangeInput = (value: any) => {
        props.onChange(value);
    }
    return (
        <WrapperInputStyle placeholder={placeholder ?? 'Nhap text'} value={props.value} style={style} type={type} {...rests} onChange={handleOnchangeInput} />
    )
}

export default InputForm