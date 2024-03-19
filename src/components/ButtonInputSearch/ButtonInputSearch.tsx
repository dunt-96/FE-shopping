import {
    SearchOutlined,
} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import InputComponent from '../InputComponent/InputComponent';
import { WrapperInputSearch } from './style';

const ButtonInputSearch = (props: any) => {
    const { size, placeholder, textButton } = props
    return (
        <WrapperInputSearch>
            <InputComponent {...props} size={size} placeholder={placeholder} style={{ borderRadius: '5px 0 0 5px' }}></InputComponent>
            <ButtonComponent size={size} textBtn={textButton} icon={<SearchOutlined />} styleBtn={{ borderRadius: '0 4px 4px 0px', backgroundColor: 'rgb(13, 92, 182)', borderColor: 'rgb(13, 92, 182)', color: '#fff', fontWeight: '600' }} ></ButtonComponent>
        </WrapperInputSearch>
    )
}

export default ButtonInputSearch

