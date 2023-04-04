import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { FlexDiv, MaxWidthDiv } from '../components/global/globalStyle'
import HeaderNav from '../components/global/HeaderNav'
import NaverBtn from '../components/login/NaverBtn'

function Login() {
  const REST_API_KEY = 'd748b149dfbb43afd8cb87be1ae85845';
  const REDIRECT_URI = 'http://localhost:3000/oauth/social/callback';
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  const navi = useNavigate();

  const kakaoLogin = () => {
    window.location.href = KAKAO_AUTH_URL
  }
  
  return (
    <FlexDiv>
      <HeaderNav />
      <MaxWidthDiv fDirection="row" jc="center" alignItem="center" height="100vh" gap="1rem">
        <div>
          <img src="" alt="mainLogo" />
        </div>
        <LikeBtnDiv color='#000000'>
          <span>구글 로그인</span>
        </LikeBtnDiv>
        <LikeBtnDiv bgColor="#FEE500" color='black' onClick={kakaoLogin}>
          <span>카카오 로그인</span>
        </LikeBtnDiv>
        <LikeBtnDiv bgColor="#03C75A">
          <NaverBtn />
        </LikeBtnDiv>
        <LikeBtnDiv color='black' onClick={()=>{navi("/intro")}}>
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