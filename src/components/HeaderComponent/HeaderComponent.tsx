import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Badge, Col, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../redux/hooks';
import { resetUser, userState } from '../../redux/slices/userSlice';
import UserService from '../../services/UserService';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { Loading } from '../Loading/Loading';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';

const HeaderComponent = () => {
    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const handleNavigation = () => {
        navigate('/sign-in')
    }
    const user = useSelector(userState);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');




    const handleLogout = async () => {
        setLoading(true);
        await UserService.logout();
        dispatch(resetUser());
        setLoading(false);
        localStorage.clear();
    };

    useEffect(() => {
        console.log('1111');
        setLoading(true);
        setName(user.name);
        setAvatar(user.avatar);
        setLoading(false);
    },[user])

    const content = (
        <div>
            <WrapperContentPopup onClick={handleLogout}>Dang xuat</WrapperContentPopup>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thong tin nguoi dung</WrapperContentPopup>
        </div>
    )

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
                <Loading isLoading={loading}>
                    <WrapperHeaderAccount>
                        {avatar ? (
                            <img src={avatar} width='50px' height='50px' style={{
                                height: '40px',
                                width: '40px',
                                borderRadius: '50%',
                                objectFit: 'cover'
                            }} alt='avatar'></img>
                        ) :
                            <UserOutlined style={{ fontSize: '30px' }} />
                        }
                        {user?.access_token ?
                            <>
                                <Popover content={content}>
                                    <div style={{ cursor: 'pointer', display: 'flex', alignItems: "center" }}>
                                        {name}
                                    </div>
                                </Popover>
                            </> :
                            (<div onClick={handleNavigation} style={{ cursor: 'pointer' }}>
                                <WrapperTextHeaderSmall>
                                    Dang nhap/Dang ky
                                </WrapperTextHeaderSmall>
                                <div style={{ display: 'flex', marginTop: '5px' }}>
                                    <WrapperTextHeaderSmall>
                                        Tai khoan
                                    </WrapperTextHeaderSmall>
                                    <CaretDownOutlined />
                                </div>
                            </div>)
                        }
                    </WrapperHeaderAccount>
                </Loading>
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