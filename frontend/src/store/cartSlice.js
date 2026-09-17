import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/axios';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('exclusive_cart')) || [],
  products: [],
  cart: [],
  fetchCartFromDatabaseStatus: 'idle',
  fetchProductsStatus: 'idle',
  syncCartToDatabaseStatus: 'idle',
  error: null,
};

export const syncCartToDatabase = createAsyncThunk(
  'cart/syncCartToDatabase',
  async (cartItems) => {
    const response = await api.post(
      '/cart',
      JSON.stringify({ cartItems }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response?.data;
  }
);

export const updateCartProductQuantity = createAsyncThunk(
  'cart/updateCartProductQuantity',
  async ({productId , quantity}) => {
    const response = await api.put(
      `/user/cart/${productId}`,
      {quantity},
    );
    return response?.data;
  }
);

export const deleteCartProductFromDatabase = createAsyncThunk(
  'cart/deleteCartProductFromDatabase',
  async (productId) => {
    const response = await api.delete(
      `/user/cart/${productId}`,
    );
    return response?.data;
  }
);

export const fetchCartFromDatabase = createAsyncThunk(
  'cart/fetchCartFromDatabase',
  async () => {
    const response = await api.get(
      '/user/cart'
    );
    return response.data;
  }
);

export const fetchProducts = createAsyncThunk(
  'cart/fetchProducts',
  async (productIds) => {
    const response = await api.post(
      '/cart/products/multipleproducts',
      JSON.stringify({ productIds }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    return response.data.products;
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
    },
    clearError(state) {
      state.error = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.fetchProductsStatus = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.fetchProductsStatus = 'succeeded';
        state.cartItems = action.payload.cart;
      })
      .addCase(fetchCartFromDatabase.pending, (state) => {
        state.fetchCartFromDatabaseStatus = 'loading';
      })
      .addCase(fetchCartFromDatabase.fulfilled, (state, action) => {
        state.fetchCartFromDatabaseStatus = 'succeeded';
        state.cartItems = action.payload.cart
      })
      .addCase(syncCartToDatabase.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart
      })
      .addCase(updateCartProductQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart
      })
      .addCase(deleteCartProductFromDatabase.fulfilled, (state, action) => {
        state.cartItems = action.payload.cart
      })
      .addCase(syncCartToDatabase.rejected, (state, action) => {
        state.error = action.error?.message || 'Failed to sync cart';
      })
      .addCase(updateCartProductQuantity.rejected, (state, action) => {
        state.error = action.error?.message || 'Failed to update quantity';
      })
      .addCase(deleteCartProductFromDatabase.rejected, (state, action) => {
        state.error = action.error?.message || 'Failed to delete item';
      })
      .addCase(fetchCartFromDatabase.rejected, (state, action) => {
        state.fetchCartFromDatabaseStatus = 'failed';
        state.error = action.error?.message || 'Failed to fetch cart';
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.fetchProductsStatus = 'failed';
        state.error = action.error?.message || 'Failed to fetch products';
      })
  }
});

export const {
  addProductToCart,
  removeProductFromCart,
  updateProductQuantity,
  clearCart,
  clearError,
} = cartSlice.actions;

export default cartSlice.reducer;
