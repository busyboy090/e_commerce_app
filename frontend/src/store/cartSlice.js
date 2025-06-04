import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('exclusive_cart')) || [],
  products: [],
  fetchCartFromDatabaseStatus: 'idle',
  fetchProductsStatus: 'idle',
  syncCartToDatabaseStatus: 'idle',

};

export const syncCartToDatabase = createAsyncThunk(
  'cart/syncCartToDatabase',
  async (cartItems) => {
    console.log(cartItems)
    try {
      const response = await privateApi.post(
        '/cart',
        JSON.stringify({ cartItems}),
        { headers: { 'Content-Type': 'application/json' } }
      );

      if(response.status === 201) {
        localStorage.removeItem('exclusive_cart')
      }

      return null;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const fetchCartFromDatabase = createAsyncThunk(
  'cart/fetchCartFromDatabase',
  async () => {
    try {
      const response = await privateApi.get(
        '/cart'
      );
      return response.data || [];
    } catch (err) {
      console.log(err);
      return []
    }
  }
);

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async (productIds) => {
    try {
      const response = await privateApi.post(
        '/products/multipleproducts',
        JSON.stringify({ productIds }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      return response.data.products;
    } catch (err) {
      console.log(err);
      return []
    }
  }
);

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addProductToCart(state, action) {
      const item = state.cartItems.find(i => i?.productId === action.payload);
      if (item) {
        item.quantity += 1;
      } else {
        state.cartItems.push({ productId: action.payload, quantity: 1 });
      }
      localStorage.setItem('exclusive_cart', JSON.stringify(state.cartItems));
    },
    removeProductFromCart(state, action) {
      state.cartItems = state.cartItems.filter(i => i?.productId !== action.payload);
      localStorage.setItem('exclusive_cart', JSON.stringify(state.cartItems));
    },
    updateProductQuantity(state, action) {
        const { productId, quantity } = action.payload;
        const item = state.cartItems.find(i => i.productId === productId);
        if (item) item.quantity = quantity;
        localStorage.setItem('exclusive_cart', JSON.stringify(state.cartItems));
    },
    clearCart(state) {
      state.cartItems = [];
      localStorage.removeItem('exclusive_cart');
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductsStatus = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchCartFromDatabase.fulfilled, (state, action) => {
        state.fetchCartFromDatabaseStatus = 'succeeded';
        state.cartItems = action.payload.cartItems;
        state.products = action.payload.products;
      })
  }
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
} = cartSlice.actions;

export default cartSlice.reducer;
