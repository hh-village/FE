import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import NaverBtn from '../components/login/NaverBtn'
import { getCookie, setCookie } from '../shared/Cookies'

function Login() {
  const token = getCookie('token')
  const REST_API_KEY = 'e5604a9bedc4cead4432fb92d94cd0bb';
  const REDIRECT_URI = 'http://localhost:3000/oauth/social/callback';
  // const REDIRECT_URI = 'http://team3-village.s3-website.ap-northeast-2.amazonaws.com/oauth/social/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navi = useNavigate();

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  const onClickAdmin = async() => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/test/login/test`)
    setCookie('token',response.headers.authorization.substring(7))
    setCookie('nickname', response.data.data)
    navi('/')
  }

  useEffect(()=>{
    if(token){
      navi('/')
    }
  })

  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv jc="center" alignItem="center" height="100vh" gap="1rem">
        <div>
          <img src="" alt="mainLogo" />
        </div>
        <LikeBtnDiv color='#000000' onClick={onClickAdmin}>
          <span>관리자 로그인</span>
        </LikeBtnDiv>
        <LikeBtnDiv bgColor="#FEE500" color='black' onClick={kakaoLogin}>
          <span>카카오 로그인</span>
        </LikeBtnDiv>
        {/* <LikeBtnDiv bgColor="#03C75A">
          <NaverBtn />
        </LikeBtnDiv> */}
        <LikeBtnDiv color='black' bgColor="#e6e6e6" onClick={()=>{navi("/")}}>
          <span>이전으로</span>
        </LikeBtnDiv>
      </MaxWidthDiv>
    </FlexDiv>
  )
}

export default Login

const LikeBtnDiv = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    color: ${({color}) => color ? color : 'white'};
    border-radius: 5px;
    font-weight: 700;
    width: 25rem;
    height: 3rem;
    cursor: pointer;
    margin-top: ${({marginTop}) => marginTop ? marginTop : 0};
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
      box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
      box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`