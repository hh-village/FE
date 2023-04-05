import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { getCookie } from '../../shared/Cookies';
import { FlexDiv, MaxWidthDiv, Div } from './globalStyle'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn';

function HeaderNav() {
  const [token, setToken] = useState("");
  const location = useLocation();
  const navi = useNavigate();

  useEffect(()=>{
    const token = getCookie("token");
    setToken(token);
    console.log(token);
  },[location])

  return (
    <FlexDiv height="6rem" position="fixed">
      <MaxWidthDiv height="100%" jc="space-between" alignItem="center">
          <Div gap="2rem">
            <div>
              <img src="" alt="mainLogo" />
              <span>Village</span>
            </div>
            <Div gap="2rem">
              <span>서비스 소개</span>
              <span>팀원 소개</span>
            </Div>
          </Div>
          <Div>
            {location.pathname === "/login"
            ? null
            : (token
              ? (location.pathname === "/mypage"
                ? <Div jc="center" alignItem="center" gap="1rem">
                    <LogoutBtn />
                  </Div>
                : <Div jc="center" alignItem="center" gap="1rem">
                    <span onClick={()=>{navi("/mypage")}} style={{cursor:"pointer"}}>마이페이지</span>
                    <LogoutBtn />
                  </Div>
                )
              : <div onClick={()=>{navi("/login")}}>
                  <LoginBtn />
                </div>)
            }
          </Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default HeaderNav