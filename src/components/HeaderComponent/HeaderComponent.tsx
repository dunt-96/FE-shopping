import {
    CaretDownOutlined,
    ShoppingCartOutlined,
    UserOutlined
} from '@ant-design/icons';
import { Badge, Col, Popover } from 'antd';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { refetchCountItems } from '../../redux/slices/orderSlice';
import { onSearchReducer } from '../../redux/slices/productSlice';
import { resetUser, userState } from '../../redux/slices/userSlice';
import UserService from '../../services/UserService';
import ButtonInputSearch from '../ButtonInputSearch/ButtonInputSearch';
import { Loading } from '../Loading/Loading';
import { WrapperContentPopup, WrapperHeader, WrapperHeaderAccount, WrapperTextHeader, WrapperTextHeaderSmall } from './style';

const HeaderComponent = (props) => {
    const { isHiddenSearch = false, isHiddenCart = false } = props;

    const navigate = useNavigate();
    const dispatch = useAppDispatch();
    const orderState = useAppSelector((state) => state.order);
    const handleNavigation = () => {
        navigate('/sign-in')
    }
    const handleNavigateToHomePage = () => {
        navigate('/');
    }
    const user = useSelector(userState);
    const [loading, setLoading] = useState(false);
    const [name, setName] = useState('');
    const [avatar, setAvatar] = useState('');

    console.log('order item', orderState.orderItems);

    // const fetchItemInCart = async () => {
    //     const res = await CartService.countItemInCart();
    //     return res;
    // }

    // const queryCountItemInCart = useQuery({
    //     queryKey: ['count'],
    //     queryFn: async () => await fetchItemInCart(),
    //     retry: 3,
    //     retryDelay: 1000
    // });

    // const { data: itemsInCart, isPending: isPendingCountItemInCart } = queryCountItemInCart;

    // console.log('item in cart', itemsInCart);
    const handleFetchCount = async () => {
        await dispatch(refetchCountItems());
    }

    useEffect(() => {
        handleFetchCount();
    }, []);


    const handleLogout = async () => {
        setLoading(true);
        await UserService.logout();
        dispatch(resetUser());
        setLoading(false);
        localStorage.clear();
    };

    useEffect(() => {
        setLoading(true);
        setName(user.name);
        setAvatar(user.avatar);
        setLoading(false);
    }, [user])

    const onSearch = (e) => {
        console.log('search', e.target.value);
        dispatch(onSearchReducer(e.target.value));
    }

    const content = (
        <div>
            <WrapperContentPopup onClick={() => navigate('/profile-user')}>Thong tin nguoi dung</WrapperContentPopup>
            {user.isAdmin && <WrapperContentPopup onClick={() => navigate('/system/admin')}>Quan ly he thong</WrapperContentPopup>}
            <WrapperContentPopup onClick={handleLogout}>Dang xuat</WrapperContentPopup>
        </div>
    )

    return (
        <WrapperHeader style={{ justifyContent: (isHiddenSearch && isHiddenCart) && 'space-between' }}>
            <Col span={5}>
                <WrapperTextHeader onClick={handleNavigateToHomePage} style={{ cursor: 'pointer' }}>
                    NguyenThanhDu
                </WrapperTextHeader>
            </Col>
            {!isHiddenSearch &&
                (
                    <Col span={13}>
                        <ButtonInputSearch
                            size='large'
                            placeholder='search'
                            textButton='Tim Kiem'
                            onChange={onSearch}
                        >

                        </ButtonInputSearch>
                    </Col>
                )
            }
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
                {!isHiddenCart &&
                    (
                        <div onClick={() => navigate('/order')} style={{ cursor: "pointer", alignItems: 'center', gap: '5px' }}>
                            <Badge count={orderState.itemsInCart} size='small'>
                                <ShoppingCartOutlined style={{ fontSize: '30px', color: '#fff' }} />
                            </Badge>
                            <WrapperTextHeaderSmall>Gio hang</WrapperTextHeaderSmall>
                        </div>
                    )
                }
            </Col>
        </WrapperHeader>
    )
}

export default HeaderComponent