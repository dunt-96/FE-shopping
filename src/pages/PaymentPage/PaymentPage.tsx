import { Form, Radio, message } from 'antd';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import InputComponent from '../../components/InputComponent/InputComponent';
import { Loading } from '../../components/Loading/Loading';
import ModalComponent from '../../components/ModelComponet/ModelComponent';
import { useMutationHook } from '../../hooks/mutationHook';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { refetchCountItems, updateListOrderSelected } from '../../redux/slices/orderSlice';
import { updateUser } from '../../redux/slices/userSlice';
import OrderService from '../../services/OrderService';
import { convertPrice } from '../../utils';
import { Label, WrapperInfo, WrapperLeft, WrapperRadio, WrapperRight, WrapperTotal } from './style';

const PaymentPage = () => {
    const order = useAppSelector((state) => state.order);
    const userState = useAppSelector((state) => state.user);
    const [isOpenModalUpdateInfo, setIsOpenModalUpdateInfo] = useState(false)
    const navigate = useNavigate();
    const [delivery, setDelivery] = useState('fast');
    const [payment, setPayment] = useState('later_money');

    // const [listChecked, setListChecked] = useState<string[]>(order.listIdChecked);
    const dispatch = useAppDispatch()
    const [form] = Form.useForm();

    const [stateUserDetails, setStateUserDetails] = useState({
        name: '',
        phone: '',
        address: '',
        city: ''
    })

    const mutationAddOrder = useMutationHook(
        (data) => {
            const { token, ...rests } = data
            const res = OrderService.createOrder({ ...rests }, token)
            return res
        },
    )

    const handleAddOrder = () => {
        if (
            userState?.access_token
            && order.orderItemsSelected
            && userState.name
            && userState.address
            && userState.phone
            && userState.city
            && order.priceIncludeAll
            && userState.id
        ) {
            console.log('asdasda');
            mutationAddOrder.mutate(
                {
                    token: userState.access_token,
                    orderItems: order.orderItemsSelected,
                    fullName: userState.name,
                    address: userState.address,
                    city: userState.city,
                    phone: userState.phone,
                    totalPrice: order.priceIncludeAll,
                    shippingPrice: order.deliveredFee,
                    paymentMethod: payment,
                    itemPrice: order.totalPrice,
                    user: userState.id,
                },
                {
                    onSuccess: (val) => {
                        console.log('val status', val);
                        if (val.status === "OK") {
                            message.success('Đặt hàng thành công');
                            dispatch(refetchCountItems());
                            // console.log('order.orderItemsSelected', order.orderItemsSelected);
                            setTimeout((time) => {
                                navigate('/orderSuccess', {
                                    state: {
                                        delivery,
                                        payment,
                                        orders: order.orderItemsSelected
                                    }
                                });
                            }, 1000)
                        } else {
                            message.error('Đặt hàng thất bại');
                        }
                    }
                }
            )
            dispatch(updateListOrderSelected)
        }
    }

    const { isPending, data } = mutationAddOrder;

    const handleChangeAddress = () => {
        setIsOpenModalUpdateInfo(true)
    }

    const handleUpdateInfoUser = () => {
        const { name, address, city, phone } = stateUserDetails
        if (name && address && city && phone) {
            mutationAddOrder.mutate({ id: userState?.id, token: userState?.access_token, ...stateUserDetails }, {
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

    const handleOnchangeDetails = (e) => {
        setStateUserDetails({
            ...stateUserDetails,
            [e.target.name]: e.target.value
        })
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

    const handleDelivery = (e) => {
        setDelivery(e.target.value)
    }

    const handlePayment = (e) => {
        setPayment(e.target.value)
    }

    return (
        <Loading isLoading={isPending}>
            <div style={{ background: '#f5f5fa', alignContent: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 84px)', paddingTop: '10px' }}>
                <div style={{ height: '100%', width: '2150px', margin: '0 auto', display: 'flex', justifyContent: 'center', }}>
                    <div style={{ display: 'flex', padding: '0 20px', justifyContent: 'center', gap: ' 70px', height: '100%', width: '80%', flexDirection: 'row' }}>
                        <WrapperLeft>
                            <WrapperInfo>
                                <div>
                                    <Label>Chọn phương thức giao hàng</Label>
                                    <WrapperRadio onChange={handleDelivery} value={delivery}>
                                        <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>FAST</span> Giao hàng tiết kiệm</Radio>
                                        <Radio value="gojek"><span style={{ color: '#ea8500', fontWeight: 'bold' }}>GO_JEK</span> Giao hàng tiết kiệm</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
                            <WrapperInfo>
                                <div>
                                    <Label>Chọn phương thức thanh toán</Label>
                                    <WrapperRadio onChange={handlePayment} value={payment}>
                                        <Radio value="later_money"> Thanh toán tiền mặt khi nhận hàng</Radio>
                                        <Radio value="paypal"> Thanh toán tiền bằng paypal</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfo>
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
                                onClick={() => handleAddOrder()}
                                styleBtn={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '100%',
                                    border: 'none',
                                    borderRadius: '4px',
                                }}
                                textBtn={'Đặt hàng'}
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
        </Loading>
    )
}

export default PaymentPage