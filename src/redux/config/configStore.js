import { configureStore } from "@reduxjs/toolkit";
import Post from "../modules/Post";
import Chat from "../modules/Chat";



const store = configureStore({
    reducer: { 
      Post,Chat
  },
  devTools: process.env.NODE_ENV === "developmetns" ? false : true,
  });
  
export default store;