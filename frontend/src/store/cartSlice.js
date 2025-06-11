import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
  cartItems: JSON.parse(localStorage.getItem('exclusive_cart')) || [],
  products: [],
  cart: [],
  fetchCartFromDatabaseStatus: 'idle',
  fetchProductsStatus: 'idle',
  syncCartToDatabaseStatus: 'idle',

};

export const syncCartToDatabase = createAsyncThunk(
  'cart/syncCartToDatabase',
  async (cartItems) => {
    try {
      const response = await api.post(
        '/cart',
        JSON.stringify({ cartItems}),
        { headers: { 'Content-Type': 'application/json' } }
      );

      return response?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const updateCartProductQuantity = createAsyncThunk(
  'cart/updateCartProductQuantity',
  async ({productId , quantity}) => {

    try {
      const response = await api.put(
        `/cart/${productId}`,
        {quantity},
      );

      return response?.data;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
);

export const deleteCartProductFromDatabase = createAsyncThunk(
  'cart/deleteCartProductFromDatabase',
  async (productId) => {
    try {
      const response = await api.delete(
        `/cart/${productId}`,
      );

      return response?.data;
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
      const response = await api.get(
        '/cart'
      );
      return response.data;
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
      const response = await api.post(
        '/products/multipleproducts',
        JSON.stringify({ productIds }),
        { headers: { 'Content-Type': 'application/json' } }
      );
      console.log(response.data)
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
        state.cartItems = action.payload.cartItems.map((item) => { 
          return { productId: item.product_id, quantity: item.quantity}
        });
        state.products = action.payload.products.map((product) =>  product.products);
      })
      .addCase(syncCartToDatabase.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems.map((item) => { 
          return { productId: item.product_id, quantity: item.quantity}
        });
        state.products = action.payload.products.map((product) =>  product.products);
      })
      .addCase(updateCartProductQuantity.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems.map((item) => { 
          return { productId: item.product_id, quantity: item.quantity}
        });
        state.products = action.payload.products.map((product) =>  product.products);
      })
      .addCase(deleteCartProductFromDatabase.fulfilled, (state, action) => {
        state.cartItems = action.payload.cartItems.map((item) => { 
          return { productId: item.product_id, quantity: item.quantity}
        });
        state.products = action.payload.products.map((product) =>  product.products);
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
