// import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
// import axios from "axios"
// import { getCookie } from "../../shared/Cookies"

// const initialState = {
//     searchData: []
// }

// export const __getSearchData = createAsyncThunk(
//     'getSearchData',
//     async({searchData}, thunkAPI) => {
//         const accessToken = getCookie('token')
//         try{
//             const res = await axios.get(`${process.env.REACT_APP_SERVER_URL}/products?name=${searchData.productName}&location=${searchData.location}`,{
//                 headers:{
//                     Authorization : `Bearer ${accessToken}`
//                 }
//             })
//             return thunkAPI.fulfillWithValue(res.data.data)
//         }catch(error){
//             console.log(error)
//         }
//     }
// )


// export const searchSlice = createSlice({
//     name: 'search',
//     initialState,
//     reducers:{},
//     extraReducers:{
//         [__getSearchData.fulfilled] : (state, {payload}) => {
//             state.searchData = payload
//         }
//     }
// })

// export default searchSlice.reducer;