import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useQuery } from '@tanstack/react-query';
import { Checkbox, Form } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Loading } from '../../components/Loading/Loading';
import * as message from '../../components/Message/Message';
import ModalComponent from '../../components/ModelComponet/ModelComponent';
import { useMutationHook } from '../../hooks/mutationHook';
import { useAppSelector } from '../../redux/hooks';
import { calcPrice, decreaseAmount, increaseAmount, removeAllOrderProduct, updateListChecked, updateListOrderItems, updateListOrderSelected } from '../../redux/slices/orderSlice';
import { updateUser } from '../../redux/slices/userSlice';
import CartService from '../../services/CartService';
import UserService from '../../services/UserService';
import { convertPrice } from '../../utils';
import { WrapperCountOrder, WrapperInfo, WrapperInputNumber, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style';

const OrderPage = () => {
    const order = useAppSelector((state) => state.order);
    const userState = useAppSelector((state) => state.user);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const navigate = useNavigate();

    // const [listChecked, setListChecked] = useState<string[]>(order.listIdChecked);
    const dispatch = useDispatch()
    const [form] = Form.useForm();

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    })

    const fetchAllItemsInCart = async () => {
        const res = await CartService.getAllItems();

        return res?.data;
    }

    const queryCart = useQuery({
        queryKey: ['products'],
        queryFn: async () => await fetchAllItemsInCart(),
        retry: 3,
        retryDelay: 1000
    });

    const { isLoading: isLoadingCart, data: listItemsInCart, isSuccess } = queryCart;

    useEffect(() => {
        if (isSuccess && listItemsInCart.status === "OK") {
            dispatch(updateListOrderItems(listItemsInCart.data))
        }
    }, [isSuccess, listItemsInCart])


    const mutationUpdate = useMutationHook(
        (data) => {
            const { id,
                token,
                ...rests } = data
            const res = UserService.updateUser(
                id,
                { ...rests }, token)
            return res
        },
    )

    const { isPending, data } = mutationUpdate

    const handleUpdateInfoUser = () => {
        const { name, address, city, phone } = stateUserDetails
        if (name && address && city && phone) {
            mutationUpdate.mutate({ id: userState?.id, token: userState?.access_token, ...stateUserDetails }, {
                onSuccess: () => {
                    dispatch(updateUser({
                        data: {
                            name, address, city, phone
                        }
                    }))
                    setIsOpenModalUpdateInfo(false)
                }
            })
        }
    }

    const onChange = (e) => {
        if (order?.listIdChecked.includes(e.target.value)) {
            const newListChecked = order?.listIdChecked.filter((item) => item !== e.target.value)
            dispatch(updateListChecked(newListChecked));
            handleCalcPrice();
        } else {
            dispatch(updateListChecked([...order.listIdChecked, e.target.value]));
            handleCalcPrice();
        }
    };

    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }))
        } else {
            dispatch(decreaseAmount({ idProduct }))
        }
    }

    const deleteFromDB = async (idProduct: string) => {
        const res = await CartService.deleteItemInCart(idProduct);
        if (res.status === "OK") {
            message.success('Xoá sản phẩm thành công');
            queryCart.refetch();
        }
    }

    const handleDeleteOrder = (idProduct) => {
        deleteFromDB(idProduct);
    }

    const handleOnchangeCheckAll = (e) => {
        if (order.orderItems.length === 0) {
            return;
        }
        if (e.target.checked) {
            let newListChecked: string[] = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item.product);
            })
            dispatch(updateListChecked([...newListChecked]));
            handleCalcPrice();

        } else {
            dispatch(updateListChecked([]));
            handleCalcPrice();
        }

    }

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
    }


    const handleCalcPrice = () => {
        dispatch(calcPrice());
    }

    const handleRemoveAllOrder = () => {
        if ((order.listIdChecked?.length ?? 0) >= 1) {
            dispatch(removeAllOrderProduct())
        }
    }

    const handleAddCart = () => {
        if (!order?.listIdChecked?.length) {
            message.error('Vui lòng chọn sản phẩm')
        } else if (!userState?.phone || !userState.address || !userState.name || !userState.city) {
            setIsOpenModalUpdateInfo(true)
        } else {
            dispatch(updateListOrderSelected());
            navigate('/payment');
        }
    }

    const handleCancelUpdate = () => {
        setStateUserDetails({
            name: '',
            phone: '',
            address: '',
            city: '',
        })
        form.resetFields()
        setIsOpenModalUpdateInfo(false)
    }

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    console.log('order irsm00000', order.orderItems);

    return (
        <div style={{ background: '#f5f5fa', alignContent: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 84px)', paddingTop: '10px' }}>
            <div style={{ height: '100%', width: '2150px', margin: '0 auto', display: 'flex', justifyContent: 'center', }}>
                <div style={{ display: 'flex', padding: '0 20px', justifyContent: 'center', height: '100%', width: '80%', flexDirection: 'row' }}>
                    <WrapperLeft>
                        <WrapperStyleHeader>
                            <span style={{ display: 'inline-block', width: '390px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll} checked={!(order.orderItems.length === 0) && order.listIdChecked?.length === order?.orderItems?.length}></Checkbox>
                                <span> Tất cả ({order?.orderItems?.length} sản phẩm)</span>
                            </span>
                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Thành tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </WrapperStyleHeader>
                        <WrapperListOrder>
                            {order?.orderItems?.map((ord) => {
                                return (
                                    <WrapperItemOrder>
                                        <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox onChange={onChange} value={ord?.product} checked={order.listIdChecked?.includes(ord.product)}></Checkbox>
                                            <img src={ord?.image} style={{ marginLeft: '10px', marginRight: '10px', width: '77px', height: '79px', objectFit: 'cover', borderRadius: '5px' }} />
                                            <div style={{
                                                width: 260,
                                                overflow: 'hidden',
                                                textOverflow: 'ellipsis',
                                                whiteSpace: 'nowrap',
                                                fontWeight: '600',
                                                fontSize: '20px'
                                            }}>{ord?.name}</div>
                                        </div>
                                        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span>
                                                <span style={{ fontSize: '14px', color: '#242424', fontWeight: '600' }}>{convertPrice(ord?.price)}</span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', ord?.product)}>
                                                    <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                                <WrapperInputNumber defaultValue={ord?.amount} value={ord?.amount} size="small" />
                                                <button style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', ord?.product)}>
                                                    <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                </button>
                                            </WrapperCountOrder>
                                            <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(ord!.price * ord?.amount)}</span>
                                            <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(ord?.product)} />
                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}
                        </WrapperListOrder>
                    </WrapperLeft>
                    <WrapperRight>
                        <div style={{ width: '100%' }}>
                            <WrapperInfo>
                                <div>
                                    <span>Địa chỉ: </span>
                                    <span style={{ fontWeight: 'bold' }}>{`${userState?.address} ${userState?.city}`} </span>
                                    <span onClick={handleChangeAddress} style={{ color: '#9255FD', cursor: 'pointer' }}>Thay đổi</span>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Tạm tính</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(order.totalPrice)}</span>
                                </div>
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Giảm giá</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(order.discount)}</span>
                                </div>
                                {/* <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>Thuế</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>0</span>
                                    </div> */}
                                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <span>Phí giao hàng</span>
                                    <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(order.deliveredFee)}</span>
                                </div>
                            </WrapperInfo>
                            <WrapperTotal>
                                <span>Tổng tiền</span>
                                <span style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                                    <span style={{ color: 'rgb(254, 56, 52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(order.priceIncludeAll)}</span>
                                    <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm VAT nếu có)</span>
                                </span>
                            </WrapperTotal>
                        </div>
                        <ButtonComponent
                            onClick={() => handleAddCart()}
                            // size={40}
                            styleBtn={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px',
                                width: '100%',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textBtn={'Mua hàng'}
                            styleTextBtn={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        ></ButtonComponent>
                    </WrapperRight>
                </div>
            </div>
            <ModalComponent title="Cập nhật thông tin giao hàng" open={isOpenModalUpdateInfo} onCancel={handleCancelUpdate} onOk={handleUpdateInfoUser}>
                <Loading isLoading={isPending}>
                    <Form
                        name="basic"
                        labelCol={{ span: 4 }}
                        wrapperCol={{ span: 20 }}
                        // onFinish={onUpdateUser}
                        autoComplete="on"
                        form={form}
                    >
                        <Form.Item
                            label="Name"
                            name="name"
                            rules={[{ required: true, message: 'Please input your name!' }]}
                        >
                            <InputComponent value={stateUserDetails['name']} onChange={handleOnchangeDetails} name="name" />
                        </Form.Item>
                        <Form.Item
                            label="City"
                            name="city"
                            rules={[{ required: true, message: 'Please input your city!' }]}
                        >
                            <InputComponent value={stateUserDetails['city']} onChange={handleOnchangeDetails} name="city" />
                        </Form.Item>
                        <Form.Item
                            label="Phone"
                            name="phone"
                            rules={[{ required: true, message: 'Please input your  phone!' }]}
                        >
                            <InputComponent value={stateUserDetails.phone} onChange={handleOnchangeDetails} name="phone" />
                        </Form.Item>

                        <Form.Item
                            label="Adress"
                            name="address"
                            rules={[{ required: true, message: 'Please input your  address!' }]}
                        >
                            <InputComponent value={stateUserDetails.address} onChange={handleOnchangeDetails} name="address" />
                        </Form.Item>
                    </Form>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default OrderPage