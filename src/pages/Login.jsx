import axios from 'axios'
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import { getCookie, setCookie } from '../shared/Cookies'



function Login() {
  const token = getCookie('token')
  // const REDIRECT_URI = 'http://localhost:3000/oauth/social/callback';
  const REDIRECT_URI = 'http://team3-village.s3-website.ap-northeast-2.amazonaws.com/oauth/social/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navi = useNavigate();

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  const Login = [
    'test1', 'test2', 'test3', 'test4', 'test5', 'test6', 'test7', 'test8', 'test9', 'test10'
  ]
  
  const onClickAdmin = async() => {
    const response = await axios.post(`${process.env.REACT_APP_SERVER_URL}/test/login/${Login[Math.floor(Math.random() * 10)]}`)
    setCookie('token',response.headers.authorization.substring(7))
    setCookie('nickname', response.data.data)
    if(localStorage.getItem("alwaysOpen")){
      navi('/service')
    }else{
      localStorage.setItem("alwaysOpen", true);
      navi('/service')
    }
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
          <img src="/images/appLogo.png" alt="mainLogo" style={{width:"150px"}}/>
        <LikeBtnDiv color='#000000' onClick={onClickAdmin}>
          <span>테스트계정 로그인</span>
        </LikeBtnDiv>
        <LikeBtnDiv bgColor="#FEE500" color='black' onClick={kakaoLogin}>
          <span>카카오 로그인</span>
        </LikeBtnDiv>
        <LikeBtnDiv color='black' bgColor="#e6e6e6" onClick={()=>{navi("/")}}>
          <span>홈으로</span>
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