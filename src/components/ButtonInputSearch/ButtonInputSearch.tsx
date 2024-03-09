import { Button, Input } from 'antd'
import React from 'react'
import {
    SearchOutlined,
} from '@ant-design/icons';
import { WrapperInputSearch } from './style';
import InputComponent from '../InputComponent/InputComponent';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props: any) => {
    const { size, placeholder, textButton, backgroundColorInput, backgroundColorButton, borderColorButton } = props
    return (
        <WrapperInputSearch>
            <InputComponent size={size} bordered={false} backgroundInputColor={backgroundColorInput} placeholder={placeholder}></InputComponent>
            {/* <Button size={size} icon={<SearchOutlined />} style={{ backgroundColor: backgroundColorButton, borderRadius: 0, borderColor: 'rgb(13, 92, 182)', color: '#fff' }}> {textButton} </Button> */}
            <ButtonComponent size={size} textBtn={textButton} icon={<SearchOutlined />} styleBtn={{ borderRadius: '0 4px 4px 0px', backgroundColor: 'rgb(13, 92, 182)', borderColor: 'rgb(13, 92, 182)', color: '#fff', fontWeight: '600' }} ></ButtonComponent>
        </WrapperInputSearch>
    )
}

export default ButtonInputSearch

