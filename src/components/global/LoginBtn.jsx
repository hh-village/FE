import React from 'react'
import styled from 'styled-components'

function LoginBtn() {
  return (
    <Button color="white" bgColor='#644AFF'>로그인</Button>
  )
}

export default LoginBtn

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