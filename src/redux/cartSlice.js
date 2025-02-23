import { createSlice } from "@reduxjs/toolkit";

const cartSlice = createSlice({
    name: "cart",
    initialState: {
        carts: [],
    },
    reducers: {
        addToCart: (state, action) => {
            state.carts.push(action.payload);
        },
        removeFromCart: (state, action) => {
            state.carts = state.carts.filter(item => item._id !== action.payload)
        },
        increment: (state, action) => {
            const item = state.carts.find(item => item._id === action.payload)
            if (item) {
                item.number += 1
            }
        },
        decrement: (state, action) => {
            const item = state.carts.find(item => item._id === action.payload)
            if (item && item.number > 1) {
                item.number -= 1
            }
        },
        removeAllCart: (state) => {
            state.carts = []
        }
    }
});

export const { addToCart, removeFromCart, removeAllCart, increment, decrement } = cartSlice.actions;
export default cartSlice.reducer;
