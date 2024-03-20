import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import counterReducer from './slices/counterSlice';
import orderReducer from './slices/orderSlice';
import productReducer from './slices/productSlice';
import userReducer from './slices/userSlice';

export const store = configureStore({
  reducer: {
    counter: counterReducer,
    user: userReducer,
    product: productReducer,
    order: orderReducer
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
