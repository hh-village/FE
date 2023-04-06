import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    image:'',
    location:''
}

export const postSlice = createSlice({
    name: 'Post',
    initialState,
    reducers:{
        storeImage : (state, action) => {
            state.image = action.payload
        },
        storeLocation : (state, action) => {
            state.location = action.payload
        }
    }
})


export const { storeImage, storeLocation } = postSlice.actions;
export default postSlice.reducer;