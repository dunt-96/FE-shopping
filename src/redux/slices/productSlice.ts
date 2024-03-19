import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store";

export interface ProductState {
    currentIdProduct: string;
    searchString: string;
}

const initialState: ProductState = {
    currentIdProduct: '',
    searchString: ''
}

export const productSlice = createSlice({
    name: 'product',
    initialState: initialState,
    reducers: {
        updateCurrentIdProduct: (state, action) => {
            const { currentIdProduct } = action.payload;
            console.log('currentIdProduct', currentIdProduct);

            state.currentIdProduct = currentIdProduct;
        },
        onSearchReducer: (state, action) => {
            state.searchString = action.payload;
        }
    }
})


export const { updateCurrentIdProduct, onSearchReducer } = productSlice.actions;

export const productState = (state: RootState) => state.product;

export default productSlice.reducer;