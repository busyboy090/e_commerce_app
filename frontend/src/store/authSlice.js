import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';
import axios from 'axios';

const initialState = {
    access_token: null,
    user: null,
    isAuthenticated: false,
    profile: null
};

const axiosNoInterceptor = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true
});

export const getUserInformations = createAsyncThunk(
    '/user/me',
    async () => {
        try {
            const response = await api.get('/user/me');
            return response.data;
          } catch (error) {
            throw error;
        }
    }
)

export const refreshToken = createAsyncThunk(
    '/auth/refresh-token',
    async () => {
      try {
        const response = await axiosNoInterceptor.get('/auth/refresh-token');
        return response.data;
      } catch (error) {
        throw error;
      }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.access_token = action.payload.access_token;
            state.isAuthenticated = true;
            localStorage.setItem('exclusive_authenticate', JSON.stringify(true));
        },
        logout: (state) => {
            state.access_token = null;
            state.user = null;
            state.isAuthenticated = false;
            localStorage.removeItem('exclusive_authenticate');
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(refreshToken.fulfilled, (state, action) => {
                if (action.payload) {
                    state.access_token = action.payload.access_token;
                    state.user = action.payload.user;
                    state.isAuthenticated = true;
                } else {
                    state.access_token = null;
                    state.user = null;
                    state.isAuthenticated = false;
                }
            })
            .addCase(getUserInformations.fulfilled, (state, action) => {
                if (action.payload) {
                    state.user = action.payload.user;
                    state.profile = action.payload.profile;
                } else {
                    state.user = null;
                    state.profile = null;
                }
            })
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;