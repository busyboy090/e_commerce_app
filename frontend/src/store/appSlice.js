import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    loading: false,
};

const appSlice = createSlice({
    name: 'app',
    initialState,
    reducers: {
        setGlobalLoading: (state, action) => {
            state.loading = action.payload;
        },
    }
});

export const { setGlobalLoading } = appSlice.actions;

export default appSlice.reducer;