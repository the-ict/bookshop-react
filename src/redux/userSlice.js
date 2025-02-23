import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    user: null,
    loading: false,
    error: false
}

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true
        },
        loginSuccess: (state, action) => {
            state.loading = false
            state.user = action.payload
        },
        loginFailure: (state) => {
            state.error = false
        },
        logout: (state) => {
            return initialState
        }
    }
})


export const { loginStart, loginSuccess, logout, loginFailure } = userSlice.actions
export default userSlice.reducer