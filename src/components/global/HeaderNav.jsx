import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import styled from 'styled-components';
import { getCookie } from '../../shared/Cookies';
import { NotifiyIcon } from '../detail/detailStyle';
import { FlexDiv, MaxWidthDiv, Div, ChatBtn } from './globalStyle'
import LoginBtn from './LoginBtn'
import LogoutBtn from './LogoutBtn';

function HeaderNav() {
  const accessToken = getCookie("token");
  const [token, setToken] = useState("");
  const location = useLocation();
  const navi = useNavigate();
  const onNavigateChat = useMutation({
    mutationKey:['onNavigateChat'],
    mutationFn: async()=>{
      const response = await axios.get(`${process.env.REACT_APP_SERVER_URL}/chat/room?`,{
        headers : {
          Authorization: `Bearer ${accessToken}`
        }
      })
      return response
    },
    onSuccess : (response) => {
      if(response.data.data == null){
        window.alert('대화 중인 채팅방이 없습니다.')
      }else{
        navi(`/chat/${response.data.data.roomList.filter(item => item.target === true)[0].roomId}`)
      }
    },
    onError : (error) => {
      console.log('잘못된 접근입니다.')
    }
  })

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
    <FlexDiv height="6rem" position="fixed" zIndex="5">
      <MaxWidthDiv fDirection="row" height="100%" jc="space-between" alignItem="center">
          <Div fDirection="row" gap="2rem">
            <img src="/images/Village.png" alt="mainLogo" style={{width:"8rem", cursor:'pointer'}} onClick={()=>{navi("/")}} />
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={()=>{navi("/search")}}>전체상품조회</Span>
            <Span style={{marginTop: "auto", marginBottom: "auto"}} onClick={registBtnHandler}>물품등록</Span>
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
                    <ChatBtn onClick={()=>{onNavigateChat.mutate()}}> 
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