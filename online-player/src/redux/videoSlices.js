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
        },
        likes:(state,action)=>{
            if(!state.currentVideo.likes.includes(action.payload)){
                // not liked
                state.currentVideo.likes.push(action.payload);
                state.currentVideo.dislikes.splice(
                    state.currentVideo.dislikes.findIndex((userId)=>userId===action.payload),
                    1
                )
            }
        },
        dislikes:(state,action)=>{
            if(!state.currentVideo.dislikes.includes(action.payload)){
                state.currentVideo.dislikes.push(action.payload);
                state.currentVideo.likes.splice(
                    state.currentVideo.likes.findIndex((userId)=>userId===action.payload),
                    1
                )
            }
        }
    },
})

// Action creators are generated for each case reducer function
export const { fetchStart, fetchSuccess, fetchfailure,likes,dislikes} = videoSlices.actions

export default videoSlices.reducer;