import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { NotifiyIcon } from '../detail/detailStyle';
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn';
import { FlexDiv, MaxWidthDiv, Div, ChatBtn } from './globalStyle'
import { getCookie } from '../../shared/Cookies';

function HeaderNav() {
  const accessToken = getCookie("token");
  const nickname = getCookie("nickname");
  const [token, setToken] = useState("");
  const location = useLocation();
  const navi = useNavigate();

  const registBtnHandler = () => {
    const token = getCookie("token");
    if(token === undefined){
      alert("로그인이 필요한 기능입니다");
      navi("/login");
    } else {
      navi("/regist");
    }
  }

  useEffect(()=>{
    setToken(accessToken);
  },[location])

  return (
    <FlexDiv height="6rem" position="fixed" zIndex="91">
      <MaxWidthDiv fDirection="row" height="100%" jc="space-between" alignItem="center">
          <Div fDirection="row" gap="2rem">
            <img src="/images/Village.png" alt="mainLogo" style={{width:"8rem", height : '100%', cursor:'pointer'}} onClick={()=>{navi("/")}} />
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={()=>{navi("/search")}}>전체상품조회</Span>
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={registBtnHandler}>물품등록</Span>
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={()=>{navi('/service')}}>서비스소개</Span>
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={()=>{navi('/team')}}>팀원소개</Span>
          </Div>
          <Div fDirection="row">
            {location.pathname === "/login"
            ? null
            : (token
              ? (location.pathname === "/mypage"
                ? <Div jc="center" alignItem="center" gap="1rem">
                    <LogoutBtn />
                  </Div>
                : <Div fDirection="row" jc="center" alignItem="center" gap="2rem">
                    <ChatBtn onClick={()=>{
                      navi(`/chat/${nickname}`)
                      }}> 
                      <NotifiyIcon src='/images/chat 1.png'/>
                      빌리지 채팅 
                    </ChatBtn>
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

const Span = styled.span`
  cursor: pointer;
`