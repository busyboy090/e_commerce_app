import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../api/axios';

const initialState = {
    access_token: null,
    user: null,
    isAuthenticated: false,
};

export const refreshToken = createAsyncThunk(
    '/auth/refresh-token',
    async() => {
        try {
            const response = await api.get('/auth/refresh-token');
            return response.data;
        } catch (error) {
            console.error('Failed to refresh token:', error);
            return null;
        }
    } 
);

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, action) => {
            state.access_token = action.payload.access_token;
            state.user = action.payload.user;
            state.isAuthenticated = true;
        },
        logout: (state) => {
            state.access_token = null;
            state.user = null;
            state.isAuthenticated = false;
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
    }
});

export const { login, logout } = authSlice.actions;

export default authSlice.reducer;