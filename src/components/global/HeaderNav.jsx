import React, { useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { FlexDiv, MaxWidthDiv, Div } from './globalStyle'
import LoginBtn from './LoginBtn'

function HeaderNav() {
  const location = useLocation();
  const navi = useNavigate();

  useEffect(()=>{
    console.log(location.pathname)
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
          <Div onClick={()=>{navi("/login")}}>
            {location.pathname === "/login" ? 
             null : <LoginBtn />
            }
          </Div>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default HeaderNav