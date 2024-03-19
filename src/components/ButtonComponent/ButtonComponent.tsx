import { Button } from 'antd';

const ButtonComponent = (props) => {
    const { size, styleBtn, styleTextBtn, textBtn, ...rest } = props;
    return (
        <Button size={size}
            style={styleBtn}
            // onClick={onClick}
            {...rest}>
            {textBtn != null || undefined || '' ? <span style={styleTextBtn}>{textBtn}</span> : null}
        </Button>
    )
}

export default ButtonComponent

