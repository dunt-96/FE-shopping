import { Input } from 'antd';

const InputComponent = (props: any) => {
    const { size, placeholder, style, bordered, ...rest } = props;
    return (
        <Input
            size={size}
            placeholder={placeholder}
            borderless={bordered}
            style={style}
            {...rest}
        />
    )
}

export default InputComponent