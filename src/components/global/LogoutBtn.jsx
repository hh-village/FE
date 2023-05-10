import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { DelCookie } from '../../shared/Cookies'

function LogoutBtn() {
  const navi = useNavigate()
  const kakaoLogout = () => {
    navi("/");
    DelCookie("token", {path: "/"});
    DelCookie("userID", {path: "/"});
    DelCookie("nickname", {path: "/"});
    alert("로그아웃 되었습니다");
    window.location.reload();
  }
  return (
    <Button color='white' bgColor='#644AFF' onClick={kakaoLogout}>로그아웃</Button>
  )
}

export default LogoutBtn

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
    color: ${({color}) => color ? color : 'black'};
    background-color: ${({bgColor}) => bgColor ? bgColor : 'white'};
    border: none;
    border-radius: 5px;
    width: 5rem;
    height: 2.5rem;
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.2);
    &:hover {
        box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
    &:active {
        background-color: #018786;
        box-shadow: inset 1px 1px 5px rgb(0, 0, 0, 0.5);
    }
`