import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Badge, Col } from 'antd';
import { useNavigate } from 'react-router-dom';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const handleNavigation = () => {
        navigate('/sign-in')
    }
    return (
        <WrapperHeader>
            <Col span={5}>
                <WrapperTextHeader>
                    NguyenThanhDu
                </WrapperTextHeader>
            </Col>
            <Col span={13}>
                <ButtonInputSearch size='large' placeholder='search' textButton='Tim Kiem' backgroundColorInput='#fff' backgroundColorButton='rgb(13, 92, 182)' borderColorButton='rgb(13, 92, 182)'></ButtonInputSearch>
            </Col>
            <Col span={6} style={{ display: 'flex', gap: '54px', alignItems: 'center', justifyContent: 'center' }}>
                <WrapperHeaderAccount>
                    <UserOutlined style={{ fontSize: '30px' }} />
                    <div onClick={handleNavigation} style={{ cursor: 'pointer' }}>
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
    )
}

export default HeaderComponent