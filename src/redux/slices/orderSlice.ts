import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface OrderInterface {
    name: string,
    amount: number,
    image: string,
    price: number,
    product: string,
    discount: number
}

const orderItems: OrderInterface[] = []

const listIdChecked: string[] = []

const initialState = {
    orderItems,
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    discount: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
    deliveredFee: 0,
    priceIncludeAll: 0,
    listIdChecked: listIdChecked
}

const calcDeliveryFee = (totalPrice) => {
    return totalPrice > 200000 ? 20000 : 15000;
}

const calcLastPrice = (totalPrice, deliveryFee, discount) => {
    return totalPrice - discount + deliveryFee;
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            if (itemOrder) {
                itemOrder.amount += orderItem?.amount
            } else {
                state.orderItems.push(orderItem)
            }
        },
        updateListChecked: (state, action) => {
            state.listIdChecked = action.payload;
        },
        resetAllPrice: (state) => {
            state.priceIncludeAll = 0;
            state.totalPrice = 0;
            state.deliveredFee = 0;
            state.discount = 0;
        },
        calcPrice: (state) => {
            const listIdProd = state.listIdChecked;
            state.listIdChecked = listIdProd;
            if (listIdProd.length === 0) {
                console.log('run here');
                state.priceIncludeAll = 0;
                state.totalPrice = 0;
                state.deliveredFee = 0;
                state.discount = 0;
            } else {
                state.priceIncludeAll = 0;
                state.totalPrice = 0;
                state.deliveredFee = 0;
                state.discount = 0;

                listIdProd.forEach(element => {
                    const itemOrder = state?.orderItems?.find((item) => item?.product === element);
                    state.totalPrice = state?.totalPrice + ((itemOrder?.price ?? 0) * (itemOrder?.amount ?? 0));
                    state.discount = state?.discount + ((itemOrder?.discount ?? 0) * (itemOrder?.amount ?? 0));

                    state.deliveredFee = calcDeliveryFee(state.totalPrice);
                    state.priceIncludeAll = calcLastPrice(state.totalPrice, state.deliveredFee, state.discount);
                });
            }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            itemOrder!.amount++;

            if (state.listIdChecked.includes(idProduct)) {
                state.totalPrice = state.totalPrice + itemOrder!.price;
                state.discount = state.discount + itemOrder!.discount;

                state.deliveredFee = calcDeliveryFee(state.totalPrice);
                state.priceIncludeAll = calcLastPrice(state.totalPrice, state.deliveredFee, state.discount);
            }

        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            itemOrder!.amount--;

            if (state.listIdChecked?.includes(idProduct)) {
                state.totalPrice = state.totalPrice - itemOrder!.price;
                state.discount = state.discount - itemOrder!.discount;

                state.deliveredFee = calcDeliveryFee(state.totalPrice);
                state.priceIncludeAll = calcLastPrice(state.totalPrice, state.deliveredFee, state.discount);
            }

        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload

            const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            state.orderItems = itemOrder
            state.totalPrice = state.orderItems.reduce((a, b) => a + b!.price, 0);
            state.discount = state.orderItems.reduce((a, b) => a + b!.discount, 0);

            state.deliveredFee = calcDeliveryFee(state.totalPrice);
            state.priceIncludeAll = calcLastPrice(state.totalPrice, state.deliveredFee, state.discount);

            state.listIdChecked = state.listIdChecked.filter((id) => (id !== idProduct));

            if (state.listIdChecked.length === 0) {
                state.priceIncludeAll = 0;
                state.totalPrice = 0;
                state.deliveredFee = 0;
                state.discount = 0;
            }
        },
        removeAllOrderProduct: (state) => {
            // const { listChecked } = action.payload;
            // const itemOrders = state?.orderItems?.filter((item) => !state.listIdChecked.includes(item.product));
            state.orderItems = [];
            state.totalPrice = 0;
            state.discount = 0;

            state.deliveredFee = 0;
            state.priceIncludeAll = 0;

            state.listIdChecked = [];
        },
    }
})


export const { addOrderProduct, updateListChecked, resetAllPrice, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct, calcPrice } = orderSlice.actions;

export const orderState = (state: RootState) => state.order;

export default orderSlice.reducer;