import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/authSlice';
import cartReducer from './features/cartSlice.js';

const store = configureStore({
    reducer: {
        auth: authReducer,
        cart: cartReducer,
    },
});

export default store;
