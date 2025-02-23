import { createSlice } from "@reduxjs/toolkit"



const favoriteSlice = createSlice({
    name: "favorite",
    initialState: {
        favorites: []
    },
    reducers: {
        addFavorite: (state, action) => {
            state.favorites.push(action.payload)
        },
        removeFavorite: (state, action) => {
            state.favorites = state.favorites.filter(favorite => favorite._id !== action.payload)
        },
        removeAll: (state) => {
            state.favorites = []
        }
    }
})

export const { addFavorite, removeFavorite, removeAll } = favoriteSlice.actions

export default favoriteSlice.reducer