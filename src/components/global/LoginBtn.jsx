import React from 'react'
import styled from 'styled-components'

function LoginBtn() {
  return (
    <Div>
        <span>로그인</span>
    </Div>
  )
}

export default LoginBtn

const Div = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: #03DAC6;
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