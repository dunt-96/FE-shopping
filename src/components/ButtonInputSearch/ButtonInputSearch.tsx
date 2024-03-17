import {
    SearchOutlined,
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import InputComponent from '../InputComponent/InputComponent';
import { WrapperInputSearch } from './style';

const ButtonInputSearch = (props: any) => {
    const { size, placeholder, textButton, backgroundColorInput, backgroundColorButton, borderColorButton } = props
    return (
        <WrapperInputSearch>
            <InputComponent size={size} backgroundInputColor={backgroundColorInput} placeholder={placeholder} style={{ borderRadius: '5px 0 0 5px' }}></InputComponent>
            {/* <Button size={size} icon={<SearchOutlined />} style={{ backgroundColor: backgroundColorButton, borderRadius: 0, borderColor: 'rgb(13, 92, 182)', color: '#fff' }}> {textButton} </Button> */}
            <ButtonComponent size={size} textBtn={textButton} icon={<SearchOutlined />} styleBtn={{ borderRadius: '0 4px 4px 0px', backgroundColor: 'rgb(13, 92, 182)', borderColor: 'rgb(13, 92, 182)', color: '#fff', fontWeight: '600' }} ></ButtonComponent>
        </WrapperInputSearch>
    )
}

export default ButtonInputSearch

