import React from 'react'
import { useNavigate } from 'react-router-dom'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function EventBanner() {
    const navi = useNavigate();
  return (
    <Div width="100%" marginTop="5rem">
        <Span>빌리지에서 드리는 더 큰 혜택</Span>
        <Div fDirection="row" width="100%" height="500px" jc="space-between" gap="1.5rem">
            <LeftEventBanner onClick={()=>window.location.href="https://docs.google.com/forms/d/1buMv3vjJuCTB40_tYxWescJU4ijJesZVfEPwuGz1Tzs/viewform?edit_requested=true"}>
                <Img src="/images/lb2.jpg" alt="왼쪽 사각 큰 이미지" />
            </LeftEventBanner>
            <Div width="100%" height="100%" jc="space-between" gap="1.5rem">
                <img src="/images/rt.png" alt="오른쪽 위 이미지" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
                <img src="/images/rb.png" alt="오른쪽 아래 이미지" style={{width:"100%", height:"100%", objectFit:"cover"}}/>
            </Div>
        </Div>
    </Div>
  )
}

export default EventBanner

const LeftEventBanner = styled.div`
    display: flex;
    width: 100%;
    height: 100%;
    background-color: #8b78ff;
    &:hover {
    cursor: pointer;
    box-shadow: 1px 1px 5px rgb(0, 0, 0, 0.5);
  }
`

const Img = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
`
const Span = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`