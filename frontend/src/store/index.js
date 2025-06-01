// src/store/index.js
import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice';
import wishListReducer from './wishListSlice'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer
  },
});

export default store;
