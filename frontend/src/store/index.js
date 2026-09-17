import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import wishListReducer from './wishListSlice.js';
import authReducer from './authSlice.js';

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
    auth: authReducer,
  },
});

export default store;
