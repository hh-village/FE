import { BrowserRouter, Route, Routes } from "react-router-dom"
// import Home from "../pages/Home"
// import Detail from "../pages/Detail"
// import Login from "../pages/Login"
// import MyPage from "../pages/MyPage"
// import Regist from "../pages/Regist"
// import Redirect from "../pages/Redirect"
// import Chat from "../pages/Chat"
// import Search from "../pages/Search"
// import Service from "../pages/Service"
// import Team from "../pages/team"
import { lazy, Suspense } from "react"
const Home = lazy(()=>import("../pages/Home"))
const Detail = lazy(()=>import("../pages/Detail"))
const Login = lazy(() => import("../pages/Login"))
const MyPage = lazy(()=>import("../pages/MyPage"))
const Regist = lazy(()=>import("../pages/Regist"))
const Redirect = lazy(() => import( "../pages/Redirect"))
const Chat = lazy(()=>import("../pages/Chat"))
const Search = lazy(()=>import("../pages/Search"))
const Service = lazy(()=>import("../pages/Service"))
const Team = lazy(()=>import("../pages/team"))

const Router = () => {
    return(
        <BrowserRouter>
            <Suspense>
                <Routes>
                    <Route path='/' element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/search' element={<Search />} />
                    <Route path='/detail/:id' element={<Detail />} />
                    <Route path='/regist' element={<Regist />} />
                    <Route path='/mypage' element={<MyPage />} />
                    <Route path='/chat/:id' element={<Chat />} />
                    <Route path='/oauth/social/callback' element={<Redirect />} />
                    <Route path='/service' element={<Service />} />
                    <Route path='/team' element={<Team />} />
                </Routes>
            </Suspense>
        </BrowserRouter>
    )
}

export default Router;