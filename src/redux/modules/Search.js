import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    productName: "",
    location: ""
}

export const searchSlice = createSlice({
    name: 'Search',
    initialState,
    reducers:{
        sendSearchData : (state, {payload}) => {
            state.productName = payload.productName
            state.location = payload.location
        }
    },
})

export const { sendSearchData } = searchSlice.actions
export default searchSlice.reducer;