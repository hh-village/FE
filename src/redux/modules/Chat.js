import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios"
import { getCookie } from "../../shared/Cookies"

const initialState = {
    wholeGet:{},
}

export const __getChatList = createAsyncThunk(
    'getChatList',
    async(payload, thunkAPI) => {
        const accessToken = getCookie('token')
        try{
            const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room/${payload}`,{
                headers:{
                    Authorization : `Bearer ${accessToken}`
                }
            })
            return thunkAPI.fulfillWithValue(response.data.data)
        }catch(error){
            console.log(error)
        }
    }
)


export const chatSlice = createSlice({
    name: 'Post',
    initialState,
    reducers:{},
    extraReducers:{
        [__getChatList.fulfilled] : (state, action) => {
            state.wholeGet = action.payload
        }
    }
})


export const { storeImage, storeLocation } = chatSlice.actions;
export default chatSlice.reducer;