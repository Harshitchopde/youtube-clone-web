import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentUser: null,
    loading: false,
    error: false
}
export const userSlices = createSlice({
    name: 'user',
    initialState,
    reducers: {
        loginStart: (state) => {
            state.loading = true;
        },
        loginSuccess: (state, action) => {
            state.loading = false;
            state.currentUser = action.payload;
        },
        loginfailure: (state) => {
            state.loading = false;
            state.error = true;
        },
        logout: (state) => {
            state.currentUser = null;
            state.loading = false;
            state.error = false;
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginfailure,logout } = userSlices.actions

export default userSlices.reducer;