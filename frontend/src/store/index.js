import { configureStore } from '@reduxjs/toolkit';
import cartReducer from './cartSlice.js';
import wishListReducer from './wishListSlice.js';
import authReducer from './authSlice.js';
import appReducer from './appSlice.js'

const store = configureStore({
  reducer: {
    cart: cartReducer,
    wishList: wishListReducer,
    auth: authReducer,
    app: appReducer
  },
});

export default store;
