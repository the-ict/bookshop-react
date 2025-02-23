import { combineReducers } from "@reduxjs/toolkit"
import { configureStore } from "@reduxjs/toolkit"
import storage from "redux-persist/lib/storage"
import { persistReducer } from "redux-persist"
import userSlice from "./userSlice"
import { persistStore } from "redux-persist"
import favoriteSlice from "./favoriteSlice"
import cartSlice from "./cartSlice"


const persistConfig = {
    key: "root",
    version: 1,
    storage
}


const reducer = combineReducers({
    user: userSlice,
    cart: cartSlice,
    favorite: favoriteSlice
})


const persistedReducer = persistReducer(persistConfig, reducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
})

export const persistor = persistStore(store)