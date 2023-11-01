import { createSlice } from '@reduxjs/toolkit'


const initialState = {
    currentVideo: null,
    loading: false,
    error: false
}
export const videoSlices = createSlice({
    name: 'video',
    initialState,
    reducers: {
        fetchStart: (state) => {
            state.loading = true;
        },
        fetchSuccess: (state, action) => {
            state.loading = false;
            state.currentVideo = action.payload;
        },
        fetchfailure: (state) => {
            state.loading = false;
            state.error = true;
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchfailure} = videoSlices.actions

export default videoSlices.reducer;