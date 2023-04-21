import { configureStore } from "@reduxjs/toolkit";
import Post from "../modules/Post";



const store = configureStore({
    reducer: { 
      Post
  },
  devTools: process.env.NODE_ENV === "developmetns" ? false : true,
  });
  
export default store;