import { BrowserRouter, Route, Routes } from "react-router-dom"
import Home from "../pages/Home"
import Detail from "../pages/Detail"
import Intro from "../pages/Intro"
import Login from "../pages/Login"
import MyPage from "../pages/MyPage"
import Regist from "../pages/Regist"
import Redirect from "../pages/Redirect"

const Router = () => {
    return(
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<Home />} />
                <Route path='/intro' element={<Intro />} />
                <Route path='/login' element={<Login />} />
                <Route path='/detail/:id' element={<Detail />} />
                <Route path='/regist' element={<Regist />} />
                <Route path='/mypage' element={<MyPage />} />
                <Route path='/oauth/social/callback' element={<Redirect />} />
            </Routes>
        </BrowserRouter>
    )
}

export default Router;