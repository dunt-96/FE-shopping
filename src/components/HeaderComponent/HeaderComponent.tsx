import { Badge, Col, Row } from 'antd'
import React from 'react'
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style'
import Search from 'antd/es/input/Search'
import {
    UserOutlined,
    CaretDownOutlined,
    ShoppingCartOutlined
} from '@ant-design/icons';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';


const HeaderComponent = () => {
    return (
        <div>
            <WrapperHeader>
                <Col span={6}>
                    <WrapperTextHeader>
                        NguyenThanhDu
                    </WrapperTextHeader>
                </Col>
                <Col span={12}>
                    <ButtonInputSearch size='large' placeholder='search' textButton='Tim Kieems' backgroundColorInput='#fff' backgroundColorButton='rgb(13, 92, 182)' borderColorButton='rgb(13, 92, 182)'></ButtonInputSearch>
                </Col>
                <Col span={6} style={{ display: 'flex', gap: '20px' }}>
                    <WrapperHeaderAccount>
                        <UserOutlined style={{ fontSize: '30px' }} />
                        <div>
                            <WrapperTextHeaderSmall>
                                Dang nhap/Dang ky
                            </WrapperTextHeaderSmall>
                            <div style={{ display: 'flex', marginTop: '5px' }}>
                                <WrapperTextHeaderSmall>
                                    Tai khoan
                                </WrapperTextHeaderSmall>
                                <CaretDownOutlined />
                            </div>
                        </div>
                    </WrapperHeaderAccount>
                    <div style={{ alignItems: 'center', gap: '5px' }}>
                        <Badge count={4} size='small'>
                            <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                        </Badge>
                        <WrapperTextHeaderSmall>Gio hang</WrapperTextHeaderSmall>
                    </div>
                </Col>
            </WrapperHeader>
        </div >
    )
}

export default HeaderComponent