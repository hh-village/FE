import { configureStore } from "@reduxjs/toolkit";
import Post from "../modules/Post";
import Chat from "../modules/Chat";
import Search from "../modules/Search";



const store = configureStore({
    reducer: { 
      Post,Chat,Search
  },
  devTools: process.env.NODE_ENV === "developmetns" ? false : true,
  });
  
export default store;