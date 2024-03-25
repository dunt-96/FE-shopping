import { useLocation } from 'react-router-dom';
import { orderConstant } from '../../constant';
import { useAppSelector } from '../../redux/hooks';
import { convertPrice } from '../../utils';
import { Label, WrapperInfo, WrapperItemOrder, WrapperLeft, WrapperValue } from './style';

const OrderSuccessPage = () => {
    const order = useAppSelector((state) => state.order);
    const location = useLocation();

    const { state } = location;

    console.log('location', order.orderItemsSelected);

    return (
        <div style={{ background: '#f5f5fa', alignContent: 'center', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', width: '100%', height: 'calc(100vh - 84px)', paddingTop: '10px' }}>
            <div style={{ width: '80%' }}>
                <h3 style={{ width: '100%', alignContent: 'flex-start' }}>Đặt hàng thành công</h3>
            </div>
            <div style={{ height: '100%', width: '2150px', alignItems: 'center', margin: '0 auto', display: 'flex', justifyContent: 'center', flexDirection: 'column' }}>
                <div style={{ display: 'flex', padding: '0 20px', justifyContent: 'center', height: '100%', width: '80%', flexDirection: 'row' }}>
                    <WrapperLeft>
                        <WrapperInfo>
                            <div>
                                <Label>Phương thức giao hàng</Label>
                                <WrapperValue>
                                    <div style={{ color: '#ea8500', fontWeight: 'bold' }}>{orderConstant.delivery[state?.delivery]}</div>
                                </WrapperValue>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            <div>
                                <Label>Phương thức thanh toán</Label>
                                <WrapperValue> {orderConstant.payment[state?.payment]}</WrapperValue>
                            </div>
                        </WrapperInfo>
                        <WrapperInfo>
                            {
                                order.orderItemsSelected.map((ord) => {
                                    return (
                                        <WrapperItemOrder>
                                            <div style={{ width: '390px', display: 'flex', alignItems: 'center', gap: 4 }}>
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
                                                <div>Số lượng: {ord?.amount}</div>
                                            </div>
                                        </WrapperItemOrder>
                                    )
                                })
                            }
                        </WrapperInfo>
                    </WrapperLeft>
                </div>
            </div>
        </div>
    )
}

export default OrderSuccessPage