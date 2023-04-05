import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    image:'',
    locX:0,
    locY:0,
}

export const postSlice = createSlice({
    name: 'Post',
    initialState,
    reducers:{
        storeImage : (state, action) => {
            state.image = action.payload
        },
        storeLocation : (state, action) => {
            state.locX = action.payload.locX
            state.locY = action.payload.locY
        }
    }
})


export const { storeImage, storeLocation } = postSlice.actions;
export default postSlice.reducer;