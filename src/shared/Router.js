import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Detail from "../pages/Detail"
import Login from "../pages/Login"
import MyPage from "../pages/MyPage"
import Regist from "../pages/Regist"
import Redirect from "../pages/Redirect"
import Chat from "../pages/Chat"
import Search from "../pages/Search"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/login' element={<Login />} />
                <Route path='/search' element={<Search />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/regist' element={<Regist />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/chat/:id' element={<Chat />} />
                <Route path='/oauth/social/callback' element={<Redirect />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;