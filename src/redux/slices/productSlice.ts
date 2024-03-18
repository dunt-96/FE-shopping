import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProductState {
    currentIdProduct: string;
}

const initialState: ProductState = {
    currentIdProduct: ''
}

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        updateCurrentIdProduct: (state, action) => {
            const { currentIdProduct } = action.payload;
            console.log('currentIdProduct', currentIdProduct);

            state.currentIdProduct = currentIdProduct;
        }
    }
})


export const { updateCurrentIdProduct } = productSlice.actions;

export const productState = (state: RootState) => state.product;

export default productSlice.reducer;