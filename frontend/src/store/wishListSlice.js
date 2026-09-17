import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '@/services/axios';

const initialState = {
  wishList: JSON.parse(localStorage.getItem('exclusive_wishList')) || [],
  products: [],
  status: 'idle',
};

export const fetchProducts = createAsyncThunk(
  'wishList/fetchProducts',
  async (productIds) => {
    const response = await api.post(
      '/products/multipleproducts',
      JSON.stringify({ productIds }),
      { headers: { 'Content-Type': 'application/json' } }
    );
    
    return response.data.products || [];
  }
);

const saveToStorage = (state) => {
  localStorage.setItem('exclusive_wishList', JSON.stringify(state.wishList));
};

const wishlistSlice = createSlice({
  name: 'wishList',
  initialState,
  reducers: {
    addToWishList(state, action) {
      const exists = state.wishList.find(item => item.productId === action.payload);
      if (!exists) {
        state.wishList.push({ productId: action.payload });
        saveToStorage(state);
      }
    },

    removeFromWishList(state, action) {
      state.wishList = state.wishList.filter(item => item.productId !== action.payload);
      saveToStorage(state);
    },

    clearWishList(state) {
      state.wishList = [];
      localStorage.removeItem('exclusive_wishList');
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.products = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.status = 'failed';
      });
  }
});

export const {
  addToWishList,
  removeFromWishList,
  clearWishList,
} = wishlistSlice.actions;

export default wishlistSlice.reducer;