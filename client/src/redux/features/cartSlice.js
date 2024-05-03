import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    cartItems: [],
    totalPrice: 0,
    tax: 0,
    shipping: 0,
};

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        setCart: (state, action) => {
            state.cartItems = action.payload.cartItems;
            state.totalPrice = action.payload.totalPrice;
            state.tax = action.payload.tax;
            state.shipping = action.payload.shipping;
        },
    },
});

export const { setCart } = cartSlice.actions;

export default cartSlice.reducer;
