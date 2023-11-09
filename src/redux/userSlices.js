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
        },
        subscription: (state, action) => {
            if (state.currentUser.subscribersUser.includes(action.payload)) {
                state.currentUser.subscribersUser.splice(
                    state.currentUser.subscribersUser.findIndex((userId) => userId === action.payload),
                    1
                )
            }
            else {
                // subscribe to the channel
                state.currentUser.subscribersUser.push(action.payload);
               
            }
            
        }
    },
})

// Action creators are generated for each case reducer function
export const { loginStart, loginSuccess, loginfailure, logout,subscription } = userSlices.actions

export default userSlices.reducer;