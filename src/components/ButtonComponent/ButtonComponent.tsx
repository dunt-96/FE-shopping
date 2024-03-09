import { Button } from 'antd'

const ButtonComponent = ({ size, styleBtn, styleTextBtn, textBtn, ...rest }: any) => {
    return (
        <Button size={size}
            style={styleBtn}
            {...rest}>
            {textBtn != null || undefined || '' ? <span style={styleTextBtn}>{textBtn}</span> : null}
        </Button>
    )
}

export default ButtonComponent