import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

// export type OrderState {

// }

const initialState = {
    orderItems: <Record<string, any>>[],
    shippingAddress: {
    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

const orderSlice = createSlice({
    name: 'order',
    initialState: initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload
            // const itemOrder = state?.orderItems?.find((item) => item?.product === orderItem.product)
            // if () {
            // itemOrder.amount += orderItem?.amount
            // } else {
            //     // state.orderItems.push(orderItem)
            // }
        },
        increaseAmount: (state, action) => {
            const { idProduct } = action.payload
            // const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            // itemOrder.amount++
        },
        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload
            // const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct)
            // itemOrder.amount--
        },
        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload

            // const itemOrder = state?.orderItems?.filter((item) => item?.product !== idProduct)
            // state.orderItems = itemOrder
        },
        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload

            // const itemOrders = state?.orderItems?.filter((item) => !listChecked.includes(item.product))
            // state.orderItems = itemOrders
        },
    }
})


export const { addOrderProduct, increaseAmount, decreaseAmount, removeOrderProduct, removeAllOrderProduct } = orderSlice.actions;

export const orderState = (state: RootState) => state.order;

export default orderSlice.reducer;