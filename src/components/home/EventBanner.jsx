import React from 'react'
import styled from 'styled-components'
import { Div } from '../global/globalStyle'

function EventBanner() {

  return (
    <Div width="100%" marginTop="5rem">
        <Span>빌리지에서 드리는 더 큰 혜택</Span>
        <Div fDirection="row" width="100%" height="500px" jc="space-between" gap="1.5rem">
            <LeftEventBanner onClick={()=>window.location.href="https://docs.google.com/forms/d/1buMv3vjJuCTB40_tYxWescJU4ijJesZVfEPwuGz1Tzs/viewform?edit_requested=true"}>
                <LeftBanner src="/images/lb2.webp" alt="왼쪽 사각 큰 이미지" loading='lazy'/>
            </LeftEventBanner>
            <Div width="100%" height="100%" jc="space-between" gap="1.5rem">
                <RightBanner src="/images/rt.webp" alt="오른쪽 위 이미지" loading='lazy'/>
                <RightBanner src="/images/rb.webp" alt="오른쪽 아래 이미지" loading='lazy'/>
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

const LeftBanner = styled.img`
    width: 588px;
    height: 500px;
    object-fit: contain;
    content-visibility: auto;
`

const RightBanner = styled.img`
    width: 588px;
    height: 238px;
    object-fit: cover;
`
const Span = styled.span`
    font-size: 1.5rem;
    font-weight: 700;
    margin-bottom: 2rem;
`