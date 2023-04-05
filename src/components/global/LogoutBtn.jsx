import React from 'react'
import styled from 'styled-components'

function LogoutBtn() {
  const kakaoLogout = () => {
    
  }
  return (
    <Button bgColor='#03DAC6' onClick={kakaoLogout}>로그아웃</Button>
  )
}

export default LogoutBtn

const Button = styled.button`
    display: flex;
    justify-content: center;
    align-items: center;
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