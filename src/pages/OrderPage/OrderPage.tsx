import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Checkbox } from 'antd';
import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { useAppSelector } from '../../redux/hooks';
import { calcPrice, decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct } from '../../redux/slices/orderSlice';
import { convertPrice } from '../../utils';
import { WrapperCountOrder, WrapperInfo, WrapperInputNumber, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperRight, WrapperStyleHeader, WrapperTotal } from './style';

const OrderPage = () => {
    const order = useAppSelector((state) => state.order)
    const [listChecked, setListChecked] = useState<string[]>(order.listIdChecked);
    const dispatch = useDispatch()

    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListChecked = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListChecked)
            handleCalcPrice(newListChecked);
        } else {
            setListChecked([...listChecked, e.target.value])
            handleCalcPrice([...listChecked, e.target.value]);
        }
    };

    useEffect(() => {
        setListChecked(order.listIdChecked);
    }, [order.listIdChecked])

    const handleChangeCount = (type, idProduct) => {
        if (type === 'increase') {
            dispatch(increaseAmount({ idProduct }))
        } else {
            dispatch(decreaseAmount({ idProduct }))
        }
    }

    const handleDeleteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }

    const handleOnchangeCheckAll = (e) => {
        if (order.orderItems.length === 0) {
            setListChecked([])
            return;
        }
        if (e.target.checked) {
            let newListChecked: string[] = [];
            order?.orderItems?.forEach((item) => {
                newListChecked.push(item.product);
            })
            setListChecked([...newListChecked])
            handleCalcPrice([...newListChecked]);

        } else {
            setListChecked([])
            handleCalcPrice([]);
        }

    }

    const handleCalcPrice = (listChecked) => {
        dispatch(calcPrice(listChecked));
    }

    const handleRemoveAllOrder = () => {
        if ((listChecked?.length ?? 0) >= 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        }
    }

    return (
        <>
            <div style={{ background: '#f5f5fa', width: '100%', height: 'calc(100vh - 84px)', paddingTop: '10px' }}>
                <div style={{ height: '100%', width: '2150px', margin: '0 auto' }}>
                    <h3 style={{ marginTop: '0px' }}>Giỏ hàng</h3>
                    <div style={{ display: 'flex', justifyContent: 'center', height: '100%' }}>
                        <WrapperLeft>
                            <WrapperStyleHeader>
                                <span style={{ display: 'inline-block', width: '390px' }}>
                                    <Checkbox onChange={handleOnchangeCheckAll} checked={!(order.orderItems.length === 0) && listChecked?.length === order?.orderItems?.length}></Checkbox>
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
                                {order?.orderItems?.map((order) => {
                                    return (
                                        <WrapperItemOrder>
                                            <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <Checkbox onChange={onChange} value={order?.product} checked={listChecked?.includes(order.product)}></Checkbox>
                                                <img src={order?.image} style={{ marginLeft: '10px', marginRight: '10px', width: '77px', height: '79px', objectFit: 'cover', borderRadius: '5px' }} />
                                                <div style={{
                                                    width: 260,
                                                    overflow: 'hidden',
                                                    textOverflow: 'ellipsis',
                                                    whiteSpace: 'nowrap',
                                                    fontWeight: '600',
                                                    fontSize: '20px'
                                                }}>{order?.name}</div>
                                            </div>
                                            <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span>
                                                    <span style={{ fontSize: '14px', color: '#242424', fontWeight: '600' }}>{convertPrice(order?.price)}</span>
                                                </span>
                                                <WrapperCountOrder>
                                                    <button style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                                                        <MinusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                    </button>
                                                    <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" />
                                                    <button style={{ flex: 1, border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('increase', order?.product)}>
                                                        <PlusOutlined style={{ color: '#000', fontSize: '10px' }} />
                                                    </button>
                                                </WrapperCountOrder>
                                                <span style={{ color: 'rgb(255, 66, 78)', fontSize: '13px', fontWeight: 500 }}>{convertPrice(order!.price * order?.amount)}</span>
                                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={() => handleDeleteOrder(order?.product)} />
                                            </div>
                                        </WrapperItemOrder>
                                    )
                                })}
                            </WrapperListOrder>
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
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
                                // onClick={() => handleAddCard(productDetails, numProduct)}
                                size={40}
                                styleBtn={{
                                    background: 'rgb(255, 57, 69)',
                                    height: '48px',
                                    width: '220px',
                                    border: 'none',
                                    borderRadius: '4px'
                                }}
                                textBtn={'Mua hàng'}
                                styleTextBtn={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                            ></ButtonComponent>
                        </WrapperRight>
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrderPage